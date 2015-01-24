---
layout: post
title: Examining Kerio Control Traffic Rules, by converting them to HTML
uuid: 3329bd8c-8518-491c-8b56-962620ed6b07
date: 2012-11-14T18:00:00+01:00
tags:
- Kerio
- Kerio&nbsp;Control
- Perl
---
The other day I came across a script written by Tony Lawrence ([Link](http://aplawrence.com/Kerio/examine_rules.html){:target="_blank"}) to convert an exported winroute.cfg configuration from Kerio Control firewall, to HTML, so that it was easier to examine the rules from the firewall, instead of looking at them directly in the configuration file or by loading them into your our firewall.

The idea is very good, especially if your are a consultant for multiple businesses running Kerio Control firewalls. But the script was not perfect, seen with my own eyes<!--break-->.

It lacked the following:

*   The correct colors, for the rules.
*   Interactivity, so that one would be able to provide the path to the winroute.cfg file. (instead of editing the script).
*   The default (fixed) bottom rule, DROP’ing all traffic not match by any of the above rules.
*   Converting some of information in the winroute.cfg, to that used in the Kerio Control web interface.
*   Output the HTML to a file, instead of directly to the command-line.
*   Clean HTML generated, so that it was compliant with for example XHTML 1.0 Strict.

Below is my updated version of Tony Lawrence’s script.

{% highlight perl %}
#!/usr/bin/perl
# Original script by Tony Lawrence, http://aplawrence.com November 2012
# Modification and optimization by Mads Fog Albrechtslund, http://hazenet.dk November 2012

use File::Basename;

if (@ARGV != 1) {
  print STDERR "\nPlease provide the path to your winroute.cfg file, as an argument to the script.\n\n";
  exit 1;
}
if($ARGV[0] =~ /\winroute.cfg$/i) {
}
else {
	print "\n" . $ARGV[0] . " is not a \"winroute.cfg\" file.\n\n";
    exit 1;
}
my $directory = dirname( $ARGV[0] );
open (HTMLFILE, ">" . $directory . "/winroute.html");
@colors=("#FAFFFF","#EFFF11","#C9D8ED","#FFCCCC","#C9EEC6","#D3BFEB","#FDE8CA","#E8E8E8");
open(I,"<:crlf",$ARGV[0]);
$lastseen="";
while (<I>) {
	chomp;
	s/^\s+//;
	$intraffic=1 if /^<list name="TrafficRules/;
	next if /^<list name="TrafficRules/;
	$intraffic=0 if /^<.list>/;
	next if not $intraffic;
	next if /<listitem>/;
	push @holding,$_;
	store_it() if (/<.listitem>/);
}
print HTMLFILE "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\"><!-- <!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\"> --><!-- <!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\"> -->\n";
print HTMLFILE "<html xmlns=\"http://www.w3.org/1999/xhtml\">\n<head>\n<meta http-equiv=\"Content-type\" content=\"text/html;charset=UTF-8\" />\n<title>winroute.html</title>\n</head>\n<body>\n<table>\n";
print HTMLFILE "<tr><th>Rule ID</th>";
print HTMLFILE "<th>Enabled</th>";
print HTMLFILE "<th>Name</th>";
print HTMLFILE "<th>Description</th>";
print HTMLFILE "<th>Source</th>";
print HTMLFILE "<th>Destination</th>";
print HTMLFILE "<th>Inspector</th>";
print HTMLFILE "<th>Service</th>";
print HTMLFILE "<th>Time</th>";
print HTMLFILE "<th>Permit</th>";
print HTMLFILE "<th>Source NAT</th>";
print HTMLFILE "<th>Destination NAT</th></tr>\n";
$x=0;
foreach(@all) {
	$x++;
	@stuff=split /\014/;
	push @disp, "\n<tr>";
	$lastn="";
	foreach(@stuff) {
		$value=value($_);
		$name=name($_);
		$colorvalue=$colors[$value - 1] if ($name eq "Color");
			next if ($name eq "Color");
			if ($name eq $lastn and $lastn) {
				push @disp, "\n<br />$value";
				next;
			}
			if ($name ne $lastn) {
			if ($lastn eq "") {
				$lastn=$name;
				push @disp, "\n";
				} else {
				$lastn=$name;
				push @disp, "</td>\n";
				}

			if (not $value) {
				push @disp, "<td>$name = (unset)";
				next;
			}
			push @disp, "<td>$name = $value";
		}
	}
	foreach(@disp) {
		s/Enabled = 1/ Yes/;
		s/Enabled.*/<b>NOT ENABLED<\/b>/;
		s/PERMIT/Allow/;
		s/DENY/<b>Deny<\/b>/;
		s/DROP/<b>Drop<\/b>/;		
		s/Service = .unset./Service = Any/;
		s/Description = .unset./Service = /;
		s/<td>.*=/<td>/;
		s/list://;
		s/ifgroup:"internet"/Internet Interfaces/;
		s/ifgroup:"trusted"/Trusted\/Local Interfaces/;		
		s/ifgroup://;
		s/vpn-user/VPN clients/;
		s/vpn-tunnel/All VPN Tunnels/;
		s/default/Default/;		
		s/"//g;		
		s/<tr>/<tr style="background-color:$colorvalue">/;
		s/iface://;
		print HTMLFILE;
	}
	print HTMLFILE "</td>\n</tr>\n";
	@disp=();
}
print HTMLFILE "\n<tr style=\"background-color:#FFCCCC\">\n<td> 0</td>\n<td>Yes</td>\n<td> Block other traffic</td>\n<td> Any other communication is denied/droped.</td>\n<td> Any</td>\n<td> Any</td>\n<td></td>\n<td> Any</td>\n<td> (unset)</td>\n<td> <b>Drop</b></td>\n<td> (unset)</td>\n<td> (unset)</td>\n</tr>\n";
print HTMLFILE "\n</table>\n\n</body>\n</html>\n";

sub store_it {
$string="";
$lastseen="";
$lname="";
foreach(@holding) {
if (/<variable name="Order">/) {
	$order=value($_);
	next;
}
next if /<.listitem>/;
$name=name($_);
if ($lastseen =~ /Src/ and $name =~/Proxy/) {
	#print HTMLFILE STDERR "Need Dst $lastseen $name\n";
	$string .= "<variable name=\"Dst\">Any</variable>\014";
	#print HTMLFILE STDERR "$string\n";
}
if ($lastseen =~ /Description/ and $name =~ /Dst/) {
	#print HTMLFILE STDERR "Need Src $lastseen $name\n";
	$string .= "<variable name=\"Src\">Any</variable>\014";
}
$string.="$_\014";
$lastseen=$name;

}
$all[$order-1]=$string;
$string=~s/.$//;
@holding=();
}

sub value {
my @v=/<.*>(.*)<.*>/;
return $v[0];
}
sub name {
my @v=/<variable name="(.*)">.*<.*>/;
return $v[0];
}
close (MYFILE);

print "\nHTML output file generated: " . $directory . "/winroute.html\n\n"
{% endhighlight %}