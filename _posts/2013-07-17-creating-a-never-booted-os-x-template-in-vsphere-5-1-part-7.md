---
layout: post
title: Creating a never booted OS X template in vSphere 5.1 - Part 7 - Making the template in vCenter 5.1 using the never booted VMDK
uuid: 0b3207dc-133c-4c47-9817-b4f9d30ad0ac
date: 2013-07-17T17:00:00+01:00
tags:
- ESXi
- Mac&nbsp;OS&nbsp;X
- vCenter
- VMware
- vSphere
---
I will focus on using the new vSphere Web Client, instead of the classic Windows-based vSphere Client. The following actions is also fully possible to do in the classic Windows-based vSphere Client<!--break-->.

Start by making the two VMDK files from the OS X Desktop available to a vSphere Web Client compatible machine (and WHY VMware don't we have a vSphere Web Client plug-in for OS X yet…). It does not matter how this is done, it could be a copy to the vSphere Web Client machine or through file-sharing or some other way.

Login to your vCenter Server, using the vSphere Web Client.

And create a 'standard' VM, based-on the Guest OS 'Apple Mac OS X 10.8 (64bit)'.

In my case, I will call the VM the same as the VMDK files, 'OS-X-Template&#8221;, that way the vSphere automatically created VMDK file, has the same name as my never booted VMDK file. Which makes it easy to just overwrite the original VMDK file, with my own never booted VMDK.

If there is a need to rename the never booted VMDK file, use the following command back on the Mac computer.

{% highlight bash %}
./vmware-vdiskmanager -n /Users/mads/Desktop/old-name.vmdk /Users/mads/Desktop/new-name.vmdk
{% endhighlight %}

Customize the VM hardware to your template needs. But don't attach a CD/DVD or a ISO/DMG file, because we are of cause not going to install a OS in the normal way.

Power on the machine, a single time, to initialize the hardware.

In the Console you should see something similarly to the image below.

{% include image.html img="/assets/2013/07/17/28-vcenter-console.png" alt-title="28-vCenter-Console.png" %}

After that, cut the power to the VM, by choosing 'Actions -> All vCenter Actions -> Power -> Power off'.

Using the vSphere Web Client, on a machine with the vSphere Web Client plug-in installed, browse the datastore where this newly created OS X VM is located.

In the vSphere Web Client, to browse a Datastore, navigate to:

vCenter -> Storage -> 'name of datastore' -> Manage -> Files

Go into the folder of the OS X VM, and then upload both VMDK files, which should have the same name as the VMDK file already in the folder. Accept to overwrite the existing VMDK file, which is just a empty VMDK.

After this, you can convert the OS X VM to a Template, and do a test deployment.

The end result should be a never before booted OS X VM, which already have the VM Tools installed, and have a Administrator account pre-configured.

### This series of blog posts consists of the following:

* Part 1 – [Introduction and reason for doing this]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1 %})
* Part 2 – [Creating an never booted DMG using System Image Creator]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1-part-2 %})
* Part 3 – [Applying a configuration and exporting a Master, using System Image Creator]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1-part-3 %})
* Part 4 – [Clone the DMG to a Sparseimage file using Disk Utility.app and then install VMware Tools]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1-part-4 %})
* Part 5 – [Obtain VMware Tools from ESXi host and install into the Sparseimage]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1-part-5 %})
* Part 6 – [Converting the Sparseimage to VMDK format]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1-part-6 %})
* Part 7 – Making the template in vCenter 5.1 using the never booted VMDK
