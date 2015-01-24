---
layout: post
title: Virtualize OS X using vSphere on Mac hardware - Part 1
uuid: e2711fe1-0885-4dfb-87f2-fa548a82509a
date: 2014-03-10T11:00:00+01:00
tags:
- ESXi
- Mac&nbsp;OS&nbsp;X
- VMware
- vSphere
---
***Originally posted on [bmspeak.businessmann.dk](http://bmspeak.businessmann.dk/2014/03/10/virtualize-os-x-using-vsphere-on-mac-hardware/){:target="_blank"}***

In this 3 part blog-series I will provide some information about how to virtualize OS X using vSphere on Mac hardware.

Considering the following questions:

*   What is required to vitualize OS X?
*   Which hardware is supported, and which hardware works?
*   How to license OS X in a virtual environment?
*   What are best practices for running OS X in a virtual environment?
*   How to safely deploy OS X from a template?
*   How to backup OS X in a virtual environment?

## What is required to vitualize OS X?

Basically the requirements are same as with any another OS.

*   A computer/server
*   A hypervisor
*   An installer for the Guest OS<!--break-->

When the Guest OS is Apple’s OS X, then the computer/server needs to be of the Apple Mac hardware type. The hypervisor needs to be vSphere ESXi 5.0 or newer.

The Mac hardware is almost identical technically to any other computer/server of the x86/x64 type. But one of the things that differs, apart from the visual design, is the Apple System Management Controller or SMC. The SMC basically identifies the computer as being a Mac, and that is why the vSphere ESXi hypervisor (from 5.0 and upwards) knows how to communicate with and virtualize the Apple SMC.

If a VM with OS X installed were to be booted up on a non-Mac computer/server, it would fail, because there is no Apple SMC, and therefore no virtual Apple SMC presented to the VM with OS X inside.

All this has been integrated into the vSphere ESXi hypervisor, because of Apple’s Software License Agreement dictates that the OS X software can only be run on Apple branded hardware. VMware have chosen, wisely, to comply with this requirement.

The installer for the guest OS needs to be for one of the following OS X versions:

*   OS X 10.9
*   OS X 10.8
*   OS X 10.7
*   OS X 10.6 Server

The installer would in most cases be either a CD/DVD or an image of a CD/DVD. Images of CD/DVD’s in the Apple world, is of the DMG file type, which both the vSphere Client and vSphere Web Client supports, as long as “All files (*.*)” are selected from the file-type drop-down in the “Select Datastore ISO file” window. Default in the Select Datastore ISO file window is “ISO Image (*.iso)”.

## Which hardware is supported, and which hardware works?

The official supported Apple hardware is pretty short:

|           Machine name          | Model identifier | Working versions of ESXi |
|:-------------------------------:|:----------------:|:------------------------:|
| Mac Pro (Mid 2010 and Mid 2012) | MacPro5,1        | 5.5,5.1 U2,5.1 U1,5.1    |
| Xserve (Early 2009)             | Xserve3,1        | 5.0 U3,5.0 U2,5.0 U1,5.0 |

But there is a lot of Apple hardware, which either work directly “out-of-the-box” or with smaller modifications to the ESXi installer.

|                   Machine name                   |          Model identifier          |                   Working versions of ESXi                   |
|:------------------------------------------------:|:----------------------------------:|:------------------------------------------------------------:|
| Mac Pro (Early 2008)                             | MacPro3,1                          | ESXi 5.5, all versions of ESXi 5.1, all versions of ESXi 5.0 |
| Mac Pro (Early 2009                              | MacPro4,1                          | ESXi 5.5, all versions of ESXi 5.1, all versions of ESXi 5.0 |
| Mac mini (Mid 2009 and Late 2009)                | Macmini3,1                         | All versions of ESXi 5.1                                     |
| Mac mini (Mid 2010)                              | Macmini4,1                         | All versions of ESXi 5.1                                     |
| Mac mini (Mid 2011)                              | Macmini5,1, Macmini5,2, Macmini5,3 | ESXi 5.5, all versions of ESXi 5.1, all versions of ESXi 5.0 |
| Mac mini (Late 2012)                             | Macmini6,1, Macmini6,2             | ESXi 5.5, all versions of ESXi 5.1, all versions of ESXi 5.0 |
| MacBook Pro 15" Retina (Mid 2012 and Early 2013) | MacBookPro10,1                     | ESXi 5.5, all versions of ESXi 5.1, all versions of ESXi 5.0 |
| Xserve (Early 2008)                              | Xserve2,1                          | all versions of ESXi 5.1, all versions of ESXi 5.0           |

Some of the above listed Apple hardware, need extra drivers for network cards or maybe need tweaks to the boot options of ESXi to work properly.

Start by going to William Lam’s [virtuallyGhetto](http://www.virtuallyghetto.com) website, where he provides a lot of information about what is needed to get ESXi to run on Apple’s Mac mini platform. William Lam also provides some pre-build ESXi installer ISO’s which contains the needed tweaks and drivers.

If the need is to run ESXi on some of the other Apple hardware platforms, a quick Google Search will provide information on what there specifically needs to be done to get ESXi working on that specific Apple platform.

One note is that the Apple-branded RAID cards for either Xserve's or Mac Pro's are not compatible with ESXi.

Regarding the new Late 2013 Mac Pro (MacPro6,1), it is currently not working in any way or form. But I have heard from several VMware related people that it will very likely be officially supported in a future release. Which release and when, I do not know.

### This series of blog posts consists of the following:

* Virtualize OS X using vSphere on Mac hardware - Part 1
* [Virtualize OS X using vSphere on Mac hardware - Part 2]({% post_url 2014-03-10-virtualize-os-x-using-vsphere-on-mac-hardware-part-2 %})
* [Virtualize OS X using vSphere on Mac hardware - Part 3]({% post_url 2014-03-10-virtualize-os-x-using-vsphere-on-mac-hardware-part-3 %})
