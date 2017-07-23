---
layout: post
title: Virtualize OS X using vSphere on Mac hardware - Part 3
uuid: 90a75b82-e8a3-4561-b466-1b1c52876d99
date: 2014-03-10T13:00:00+01:00
tags:
- ESXi
- Mac&nbsp;OS&nbsp;X
- VMware
- vSphere
---
A VM running OS X can be cloned or turned into a template just like any other VM. But for OS X there is no vSphere/ESXi integrated “sysprep” tool. So when a clone is made, it is a 100% clone, the only thing that changes is the hardware (new Network MAC address and new virtual hardware serial).

As far as I see it, there are 3 ways around this problem<!--break-->.

## 1. Do a clean install of every OS X VM that needs to be deployed

This is far from optimal, because of the time spent installing is just waste.

Rich Trouton have developed a solution to do automatic installations of OS X, for use on ESXi, but each time a new VM running OS X is needed, the full installation has to run its course, although it will be automatic using Rich Trouton’s solution.

[Creating customized OS X installer disk images for VMware Fusion](http://derflounder.wordpress.com/2013/08/02/creating-customized-os-x-installer-disk-images-for-vmware-fusion/){:target="_blank"}

## 2. Cleanup the “template” and then do a clone

This can either be done by hand or using a cleanup script. The problem is that there is not a complete guide to what needs to be cleaned. This method is good, if there needs to be a lot of customization done on the “template”, because it can be done on a running system.

## 3. Make a VMDK which has OS X installed, but which has never been booted

Seen from my point of view, this is the best solution, and also the closest to a “sysprep” equivalent for OS X. The system will only be installed once into a OS X friendly DMG file, then customized with settings and additional applications will be installed, before the DMG file will be converted to VMDK format.

For customization of settings, I have used a script called System Image Creation (SIC) developed by Duncan McCracken of Mondada

[GitHub - System Image Creation (SIC)](https://github.com/mondada/SIC){:target="_blank"}

The SIC script customizes many basic settings in OS X, as well as creating a default local system administrator account.  When the output from the SIC script is ready, it is possible to install additional applications, such as VMware Tools and perhaps the OS X Server application.

The last part is to convert the DMG file to VMDK format, which can be using command line tools included in VMware Fusion.

I learned the conversion part from Alan Gordon, a former colleague from an earlier employment.

I have earlier written a long blogpost on how to do all this, in regards to OS X 10.8 Mountain Lion:

[Creating a never booted OS X template in vSphere 5.1]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1 %})

## How to backup OS X in a virtual environment?

When running OS X virtualized, it is of cause possible to use existing OS X backup software, which are based on agents inside each VM running OS X.

But in most virtualized environment it is normal to use a backup solution that uses VMware vStorage APIs for Data Protection (VADP). There are a lot of solutions out there, including solutions from VMware themselves.

But when talking about virtualizing OS X, it is important to consider if the backup solution provides File Level Restore from a HFS+ filesystem, which is what OS X uses.

This will provide the opportunity to do a full image backup of the VM (running OS X), but still be able to restore a single file from that image backup file.

VMware’s own vSphere Data Protection (VDP) and vSphere Data Protection Advanced (VDPA) products, does not support File Level Restore from HFS+ filesystems.

To the best of my knowledge, [Veeam Backup and Replication](http://www.veeam.com/vm-backup-recovery-replication-software.html?ad=menu){:target="_blank"} is the only VADP solution that can do File Level Restore from a HFS+ filesystem, as documented here, [Veeam - Guest OS File Recovery](http://helpcenter.veeam.com/backup/70/vsphere/guest_file_recovery.html){:target="_blank"}.

### This series of blog posts consists of the following:

* [Virtualize OS X using vSphere on Mac hardware - Part 1]({% post_url 2014-03-10-virtualize-os-x-using-vsphere-on-mac-hardware %})
* [Virtualize OS X using vSphere on Mac hardware - Part 2]({% post_url 2014-03-10-virtualize-os-x-using-vsphere-on-mac-hardware-part-2 %})
* Virtualize OS X using vSphere on Mac hardware - Part 3
