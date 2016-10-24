---
layout: post
title: vCenter 5.5 install fails during vCenter Server Directory Service installation
uuid: 4306268e-7999-4cab-9c1d-aa0393f97c2c
date: 2013-12-05T18:00:00+01:00
tags:
- vCenter
- VMware
---
Today I was installing a new vCenter 5.5 server for a customer, on a freshly installed Windows Server 2012 VM, which would also be hosting the Micrsoft SQL database locally.

I had already joined the server to the domain and setup Micrsoft SQL Server 2012 SP1, and created the vCenter Database, and an accompanying System DSN, so I was ready to do the vCenter installation.

I chose to install using the Simple Install method, because... well this was a simple installation.

SSO, vSphere Web Client and Inventory Service all installed with any issues.

But during the vCenter Server installation, I got a error<!--break--> with something like:

{% highlight text %}
the trust relationship between this workstation and the primary domain failed
{% endhighlight %}

Unfortunately, I did not take a screenshot, so I don't have the precise error message.

The error occurred during the installation of vCenter Server Directory Service (also called vmwarevcmsds).

I retried the install a couple of times, with a restart and other basic stuff in between, but the error persisted.

Searching for a solution the recommended fix was to rejoin the server to the domain,

which wasn't a good solution in my mind, do to the Micrsoft SQL Server running on this server.

So I found another solution here:

[implbits.com](http://implbits.com/About/Blog/tabid/78/post/don-t-rejoin-to-fix-the-trust-relationship-between-this-workstation-and-the-primary-domain-failed/Default.aspx){:target="_blank"}

The method I chose to use, was the netdom.exe method, which was the simplest of the two suggested on the site.

All I did was open a administrative Command Pompt, by selecting "run as Administrator".

And then run the below command:

{% highlight batch %}
_netdom.exe resetpwd /s:dc01.example.com /ud:example.com\domain-admin-user /pd:*_
{% endhighlight %}

Change _dc01.example.com_ to a Domain Controller for your Domain

and change _example.com\domain-admin-user_ to a Domain Administrator user within your domain.

The _/pd:*_ specifies that you will be prompted for the password of the Domain Administrator user, so that the password won't be in clear text.

When the netdom.exe returned success, I rebooted the server

and ran the vCenter Server installation again (not the complete Simple Install, just vCenter Server). And it now worked.