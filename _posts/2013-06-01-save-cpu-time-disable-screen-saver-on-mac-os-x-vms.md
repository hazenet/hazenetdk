---
layout: post
title: Save CPU time, disable Screen Saver on Mac OS X VMs
uuid: f1e64ca5-3250-4366-89c4-ad4ae07f35bd
date: 2013-06-01T18:00:00+01:00
tags:
- ESXi
- Mac&nbsp;OS&nbsp;X
- vCenter
- VMware
- vSphere
---
By default Mac OS X comes with the Screen Saver enabled, and set to kick in after 20 min. This is good in the physical world, to avoid screen burn in and somebody watching. In the virtual world, it does not make much sense, because there is no screen, so no risk of screen burn in or for that matter somebody watching. But besides the above mention reasons, there is another reason to disable the Screen Saver in Mac OS X VMs. And that is the CPU utilization when the Screen Saver is running<!--break-->.

In the physical world the physical Mac would have a some what capable graphics card, which would handle the Screen Saver, when it kicks in. But the virtual Mac does not have this, and therefore it is the CPU that needs to do the processing of the Screen Saver. This means that a virtual Mac doing nothing, but with the Screen Saver enable, will actually utilize a great deal of CPU time, just to process the Screen Saver.

To demonstrate I have deployed two identical virtual Mac OS X machines, running 10.8.3 Client. The only difference is that one of them have the Screen Saver disabled and the other have it enabled. They both have 1 vCPU, 2GB Ram and 30GB Hard drive, and are running on Virtual Hardware Version 9. Both are running on a cluster of 3 Mac Pro's, which are running VMware vSphere ESXi 5.1.

Below is a screen shot from vCenter, showing the difference in CPU utilization on the 2 VMs.

{% include image.html img="/assets/2013/06/01/screen-saver-cpu.png" alt-title="Screen-Saver-CPU.png" %}

With the Screen Saver enabled it is using 2010 MHz, but with the Screen Saver disabled it is only using 27 Mhz.

**Update**

[Frank Brix Pedersen](https://twitter.com/frankbrix){:target="_blank"} (author of [vfrank.org](http://www.vfrank.org){:target="_blank"}) asked for a screenshot from esxtop. So after a &#8216;1-tweet&#8217; crash-course in esxtop (by the way, thanks Frank), I made the below screenshot.

{% include image.html img="/assets/2013/06/01/screen-saver-esxtop.png" alt-title="Screen-Saver-esxtop.jpg" %}

This time the readings from vCenter was, 1967 Mhz with Screen Saver enabled and 26 MHz with Screen Saver disabled.

Other settings I recommend disabling is the following in the &#8216;Energy Saver&#8217; pane in ’System Preferences’:

*   Computer Sleep (set it to “Never”)
*   Display Sleep (set it to “Never”)
*   Put hard disk to sleep when possible (“Unchecked”)
*   Allow power button to put computer to sleep (“Unchecked”)