---
layout: post
title: Virtualize OS X using vSphere on Mac hardware - Part 2
uuid: 5db400e8-36e8-4f80-85a6-429113e56af5
date: 2014-03-10T12:00:00+01:00
tags:
- ESXi
- Mac&nbsp;OS&nbsp;X
- VMware
- vSphere
---
***Originally posted on [bmspeak.businessmann.dk](http://bmspeak.businessmann.dk/2014/03/10/virtualize-os-x-using-vsphere-on-mac-hardware/){:target="_blank"}***

Unlike Microsoft Windows, Apple’s OS X is not licensed per physical CPU socket, but it is instead generally licensed per OS instance.

But it depends on the version of the OS, how it was purchased and what the usage is.

To understand how a license for OS X is permitted to be used, it is recommended to read “Section 2” of the “Software License Agreement” for the specific version of OS X or OS X Server<!--break-->.

All Apple’s Software License Agreements can be found online in PDF form here:

[Apple's Legal website](http://www.apple.com/legal/sla/){:target="_blank"}

In a virtual environment, an individual license for each running instances of OS X and OS X Server is needed.

But unlike with Microsoft Windows, it does not matter, how many hosts or physical CPU sockets there are. And a given VM can be vMotion’ed to any Apple host in the virtual environment, without any worry if that particular host is licensed, because it is the individual VM that is licensed.

Most people already know that both OS X and OS X Server, are available from the Mac App Store. OS X 10.9 Mavericks is free, so that just needs to be downloaded from the Mac App Store, preferably with a dedicated company account, instead of your typical private account. If there is a need for more than a single license of the OS X Server app, the best place to purchase is via the Apple Store.

[OS X Server 3.0 at the Apple Store](http://store.apple.com/dk-business/search/OS-X-Server-3.0-Single-Unit-License#!){:target="_blank"}

Here it is possible to either buy multiple single copies or volume licenses (20+ licenses at a time) of OS X Server App 3.0.

If less than 20 licenses are bought at a time, an email with individual license/redemption codes will be received, but there is no need to redeem all of them. One redemption is enough, and then just save the email as proof, that you are granted right to run the purchased number of OS X Server’s.

If more than 20 licenses are bought at a time, an email with one redemption code is received, and rights granted to run a specified number of OS X Server is provided.

If there is a need to run older versions of either OS X or OS X Server, a separate license of the specific version is required.

*   OS X 10.8 Mountain Lion  
[Single license of the client OS is still available at the Apple Store](http://store.apple.com/dk-business/search/Mountion-Lion?target=smb#!){:target="_blank"}
*   OS X 10.7 Lion  
[Single license of the client OS is still available at the Apple Store](http://store.apple.com/dk-business/search/10.7?target=smb#!){:target="_blank"}
*   OS X 10.6 Server  
[Single licenses can still be bought online from places like Amazon and Ebay](http://www.amazon.com/Mac-Server-v10-6-Snow-Leopard/dp/B001AMPORG){:target="_blank"}

## What are best practices for running OS X in a virtual environment?

*   **Disable screensavers: both the at local user account, the root user and the loginscreen**

Disable all screensavers. Most of the screensavers for OS X are built to use the GPU for graphics processing, but while running as a VM the OS X system doesn’t have access to a specifically powerfully vGPU, so it uses the CPU to do graphics processing. This results in a very high CPU utilization if the OS X VM is displaying its screensaver.  And the screensaver does not have any purpose in a VM.

In OS X there are at least 2 different screensavers.

1.  The User Screen Saver  

	This can be disabled by logging into the user account and going to “System Preferences -> Desktop &amp; Screen Saver -> Screen Saver” and then selecting “Never” in the “Start after:” drop-down box.
2.  The Login-window Screen Saver  

	The easiest way to disable this is by running the following command in Terminal on the OS X system:

{% highlight bash %}
sudo defaults write /Library/Preferences/com.apple.screensaver loginWindowIdleTime 0
{% endhighlight %}

I have written a blogpost about this issue in a earlier blogpost:

[Save CPU time, disable Screen Saver on Mac OS X VMs]({% post_url 2013-06-01-save-cpu-time-disable-screen-saver-on-mac-os-x-vms %})

*   **Disable energy settings**

Disable all energy saving settings, so that the OS X inside the VM does not try to put the virtual harddisks to sleep, sleep the display or sleep the OS.

This can be done by going to “System Preferences -&gt; Energy Saver” and adjusting the settings.

*   **Enable Remote Administration for use with Apple Remote Desktop and VNC**

Enable “Remote Management” in “System Preferences -&gt; Sharing”, and select all settings in the “All local users can access this computer to:” option dialog. Selecting all the settings can easily be done by hold ALT on the keyboard and clicking one of the check-boxes, then they will all be checked.

Clicking the “Computer Settings…” button in the “Remote Management”, gives the option to set a VNC password, when remoting into this OS X using VNC software, instead of Apple’s own Remote Desktop software.

If there is a need to manage more than a couple of OS X systems, I would suggest buying the [Apple Remote Desktop software, available on the Mac App Store](https://itunes.apple.com/app/apple-remote-desktop/id409907375){:target="_blank"}

*   **2 vCPUs if planing to deploy Open Directory**

If the plan is to virtualize Apple’s Open Directory (in some ways similar to Microsoft Active Directory), then the VM running the OS X Open Directory software needs to have 2 vCPUs. If the VM only has 1 vCPU the creation of Open Directory will fail.

>**Update**  
>  
>Thanks to Charlie for the comment regarding that the 2 vCPU's is no longer a requirement for Open Directory on Mavericks.  
>[Open Directory in Mavericks no longer requires multiple processors](http://derflounder.wordpress.com/2013/11/22/open-directory-in-mavericks-no-longer-requires-multiple-processors/){:target="_blank"}


Almost every other OS X VM can be run with 1 vCPU, unless of cause the resource requirements for the specific OS X instance is higher than 1 vCPU.

*   **Unable to resize HFS+ partitions**

Some versions of VMWare Virtual Hardware and ESXi have “issues” with resizing a VMDK containing a HFS+ partition.

The VMDK can be resize without problem, seen from the VMware vSphere side, but OS X won’t always be able to resize the partition inside the VMDK.

I have not yet been able to pinpoint which combinations of OS X, Virtual Hardware and ESXi are causing this problem.

But I have had better luck doing this operation with Virtual Hardware 10 on ESXi 5.5.

So if possible do run OS X with Virtual Hardware 10 on ESXi 5.5, especially if there is a need to resize the virtual harddisks of OS X VM’s.

### This series of blog posts consists of the following:

* [Virtualize OS X using vSphere on Mac hardware - Part 1]({% post_url 2014-03-10-virtualize-os-x-using-vsphere-on-mac-hardware %})
* Virtualize OS X using vSphere on Mac hardware - Part 2
* [Virtualize OS X using vSphere on Mac hardware - Part 3]({% post_url 2014-03-10-virtualize-os-x-using-vsphere-on-mac-hardware-part-3 %})
