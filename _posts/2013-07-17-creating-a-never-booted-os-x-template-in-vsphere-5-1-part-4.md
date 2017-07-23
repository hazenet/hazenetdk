---
layout: post
title: Creating a never booted OS X template in vSphere 5.1 - Part 4 - Clone the DMG to a Sparseimage file using Disk Utility.app and then install VMware Tools
uuid: d886adbd-f4a4-40d6-bd1a-4a65cecb7962
date: 2013-07-17T14:00:00+01:00
tags:
- ESXi
- Mac&nbsp;OS&nbsp;X
- vCenter
- VMware
- vSphere
---
The generated DMG image in the 'Masters' folder is not a copy of the original System DMG image from the 'Library' folder with a applied configuration.

To be precise it is a Read-Only DMG, with a 'Apple Partition Map' partition map scheme and it has been resized so that there is only around 100 MB of free space available in it<!--break-->.

So it is far from ideal to be convert into a VMDK and be booted up as a VM. Being that OS X 10.8 don't support a 'Apple Partition Map' partition map scheme on the startup volume, and that 100 MB free space is very little headroom to install anything onto, and of cause it is **read-only**. All this is perfectly fine for the intended use of the DMG file, which is to be deployed/cloned onto a physical hard drive of a Mac computer.

In our case, we need to change it to something more suitable.

We will clone the content of the generated DMG image in the 'Masters' folder, into a manually created Sparseimage image file, which will have the settings we want.

I my case this will mean:

*   A 'GUID Partition Map' partition map scheme
*   Be Read/Write
*   Have a total capacity of 30GB

The other good thing about a Sparseimage image file, instead of a DMG image file, is that the size of it on the hard drive, will only be that of the content inside it, not the total capacity.

Start be launching the Disk Utility application located in '/Applications/Utilities/', and then from the 'File' menu select 'New -> Blank Disk Image…', which will open up the 'New Blank Image' dialog.

{% include image.html img="/assets/2013/07/17/18-disk-utility-new-blank-image.png" alt-title="18-Disk-Utility-New-Blank-Image.png" %}

Fill out the fields as below.

{% include image.html img="/assets/2013/07/17/19-disk-utility-new-blank-image-filled-out.png" alt-title="19-Disk-Utility-New-Blank-Image-Filled-Out.png" %}

Of cause you can choose your own values.

*   The 'Save as' field is the name of the Sparseimage file.
*   The 'Name' field is the name of the volume inside the Sparseimage file.
*   Size is the max capacity of the Volume inside the Sparseimage file.
*   The 'Format' field is the volume format of the volume inside the Sparseimage file, leave it at the default 'Mac OS Extended (Journaled)'
*   The 'Encryption' field gives you the option to encrypt the content of the Sparseimage file, which we don't want to, so leave it at the default 'none' option.
*   The 'Partitions' field lets you choose the partition map scheme of the Sparseimage file, change this to 'Single Partition &#8211; GUID Partition Map'
*   The 'Image Format' field lets you choose the image format of the generated disk image. Change this to 'Sparse disk image', which implies that disk image also will be Read/Write.

The generated Sparseimage file will be added to the list of disks on the left side of the 'Disk Utility' window and will be mounted automatically.

{% include image.html img="/assets/2013/07/17/20-disk-utility-sparseimage-created.png" alt-title="20-Disk-Utility-Sparseimage-Created.png" %}

Now in the Finder navigate to the 'Masters' folder of SIC, the default location is '/Users/Shared/SIC/Masters/'.

Drag and drop the 'mountainlion_12e55_user.i386.hfs.dmg' into the list of disks on the left side of the 'Disk Utility' window.

{% include image.html img="/assets/2013/07/17/21-disk-utility-drag-and-drop.png" alt-title="21-Disk-Utility-Drag-and-Drop.png" %}

Select the 'mountainlion_12e55_user.i386.hfs.dmg' image in the list of disks in the left side of the 'Disk Utility' window, and choose 'Restore' pane in the top part of the window.

Now drag and drop the mounted 'ServerHD' volume (the indented volume in the list) from the list of disks into the 'Destination' field of the 'Restore' pane.

{% include image.html img="/assets/2013/07/17/22-disk-utility-restore-pane.png" alt-title="22-Disk-Utility-Restore-Pane.png" %}

Now click the 'Restore' button in the lower right corner of the 'Disk Utility' window.

The content from the 'mountainlion_12e55_user.i386.hfs.dmg' image will now be cloned into the 'ServerHD' volume inside the newly created Sparseimage file.

After the operation has finished, the 'ServerHD' Sparseimage should still be mounted on the Desktop.

### This series of blog posts consists of the following:

* Part 1 – [Introduction and reason for doing this]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1 %})
* Part 2 – [Creating an never booted DMG using System Image Creator]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1-part-2 %})
* Part 3 – [Applying a configuration and exporting a Master, using System Image Creator]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1-part-3 %})
* Part 4 – Clone the DMG to a Sparseimage file using Disk Utility.app and then install VMware Tools
* Part 5 – [Obtain VMware Tools from ESXi host and install into the Sparseimage]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1-part-5 %})
* Part 6 – [Converting the Sparseimage to VMDK format]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1-part-6 %})
* Part 7 – [Making the template in vCenter 5.1 using the never booted VMDK]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1-part-7 %})
