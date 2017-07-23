---
layout: post
title: The troubles of resetting IP on APC Network Management Card
uuid: 223889a0-4711-4ac2-a0d5-41e3e6c08d4f
date: 2017-02-07T21:00:00+01:00
tags:
- APC
- Homelab
---

I recently purchased a used APC Smart-UPS 1000 (SU1000) and a used APC Network Management Card (AP9619), each from separate sellers. So the amount of information and accessories was limited.

{% include image.html img="/assets/2017/02/07/apc-smart-ups-1000.jpg" alt-title="APC Smart-UPS 1000" caption="APC Smart-UPS 1000"%}

As a result I did not know the IP address of the APC Network Manamangement Card.

No big deal, was my initial thought. Oh how I was wrong<!--break-->.

{% include image.html img="/assets/2017/02/07/apc-ap9619.jpg" alt-title="APC Network Management Card AP9619" caption="APC Network Management Card AP9619" %}

As shown above the APC Network Management Card AP6919 has a reset button, so my first thought was just to find the manual and follow the reset procedure.  
The problem with this is that the very fine hardware reset button, only resets the username and password of the Network Management Card, not the IP Network configuration.

So my next thought was, "Okay, the prior owner properly used a IP in one of the Private IP ranges, I will just brute-force scan every Private IP".  
So I setup a Windows VM, and installed [Angry IP Scanner](http://angryip.org){:target="_blank"}, turned up the threading and scanned 17 million 891 thousands 328 IP addresses over the time of about 36 hours.  
But still no luck.

So the last resort, was to go old-school and find a serial cable, and hook up to the Serial connector on the APC Smart-UPS 1000.  
According to the documentation, thru that method it should be possible to reset and configure the IP Network on the installed APC Network Management Card.

But based on the history above, this of course also had issues.  
First issue was that the serial cable needed to be a APC proprietary cable (APC partnumbers: 940-0024 or 940-1524).  
The short cable (940-0024) retails for more than 50 USD (in Denmark), which is almost the same as I paid for the UPS and Network Management Card combined.  
So buying a new cable was a No-Go.

But according to this [guide](http://pinoutguide.com/UPS/apc_smart_cable_pinout.shtml){:target="_blank"} it should be possible to re-wire a standard serial cable into this proprietary cable.

One newly acquired serial cable, a pair of wire-cutters, a soldering-iron and some heat shrink tubing later I had a cable which lived up to the specs of the APC proprietary cable.

Below I have made a schematic of both a standard Serial cable and the proprietary APC cable.  
The colours of the wires is just the colours of my cheaply bought standard Serial cable, so no guarantee that they will match in other cables.

{% include image.html img="/assets/2017/02/07/serial-cable-standard.png" alt-title="APC Network Management Card AP9619" caption="Schematic of standard Serial cable" %}

{% include image.html img="/assets/2017/02/07/serial-cable-apc.png" alt-title="APC Network Management Card AP9619" caption="Schematic of proprietary APC Serial cable (940-0024 or 940-1524)" %}

So now I just needed to plug in the cable and load up a Serial Console (like [PuTTy on a PC](http://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html){:target="_blank"} or [Serial on a Mac](https://www.decisivetactics.com/products/serial/){:target="_blank"}) and open a connection with the settings specified by [APC in this FAQ](http://www.apc.com/us/en/faqs/FA156064/){:target="_blank"}:

{% highlight text %}
2400 bps, 8 data bits, no parity, 1 stop bit, and no flow control.
{% endhighlight %}

But to carry on with the story, this of course did not work.
I started testing on my Mac laptop with the Serial app and a USB-to-Serial dongle.

I decided that I might have a issue with either the Serial app or the USB-to-Serial dongle, so I found a old desktop PC running Windows XP, which had HyperTerminal installed.

This did not work either.

After some trial and error, some googling and pondering, I figured out that the Serial settings specified by APC was not correct.  
The correct settings needs to be like this:

{% highlight text %}
9600 bps, 8 data bits, no parity, 1 stop bit, and no flow control.
{% endhighlight %}

Finally, I got access to the configuration.  
The IP used by the prior owner was 193.71.25.215/24, if anybody was wondering.

The last tidbit of this story, was that the reset button on the back of the APC Network Management Card, only temporarily resets the username/password.

So follow the procedure to reset the username/password, login with the "apc"/"apc" combo, and the use the menu's of the Serial console to permanently assign your chosen administrator username   and password.
