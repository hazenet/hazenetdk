---
layout: post
title: Creating a never booted OS X template in vSphere 5.1 - Part 1 - Introduction and reason for doing this
uuid: fb49668b-9c63-4aa4-aac8-731b02fa2769
date: 2013-07-17T11:00:00+01:00
tags:
- ESXi
- Mac&nbsp;OS&nbsp;X
- vCenter
- VMware
- vSphere
---
The goal of this series of blog posts is to produce a never booted installation of OS X Mountain Lion, in a VMDK, which can be used as a template in VMware vSphere vCenter 5.1.

The reason for doing this, is that when a OS X installation is done the normal way, using the Installation GUI, then on the first boot of the newly installed machine there is created a bunch of machine specific files and items<!--break-->.

These machine specific files and items, e.g. the Local Kerberos Key Distribution Center (or LKDC), needs to be cleaned out, if the installation is going to be used as a template, either in VMware vSphere or using traditional image deployment techniques.

Instead of doing the installation using the normal GUI procedures, it is possible to install OS X into an empty DMG image file, and therefor the installed version of OS X is never booted, and thereby the machine specific files and items are never created. Leaving you with a pristine and untouched version of OS X, ready to be booted for the very first time, when deployed.

During this series of blog posts I will walk you through how to do all this, with detailed instructions and screenshots.

I will be using the following tools and files throughout this series of blog posts:

### System Image Creator

This is a BASH script, for installing and configuring a never booted version of OS X into a DMG image file.

It is a free Open Source tool, originally created by Duncan McCracken, at [Mondada.com.au](http://www.mondada.com.au){:target="_blank"}

The newest version of the BASH script is available on Github: [https://github.com/mondada/SIC](https://github.com/mondada/SIC){:target="_blank"}

### Disk Utility

This is a built in GUI application, 'Disk Utility.app', located in '/Applications/Utilities/'. It is used for managing hard drives and disk images.

### installer

This is a built-in Command Line tool in OS X, which is the CLI equivalent of the GUI 'Installer.app'. But the CLI version lets you specify the target disk to be install into. In this series of blog posts it will be a mounted Sparseimage file that will be the target.

### VMware Fusion

This is VMware's desktop hypervisor for Mac.

I am not going to be using it in the normal way.

Instead I am going to use some Command Line Utilities included with VMware Fusion. More precisely vmware-rawdiskCreator and vmware-vdiskmanager.

It does not have to be a purchased version of VMware Fusion, a Trial version will work fine in this case.

Obtain VMware Fusion here: [http://www.vmware.com/products/fusion/overview.html](http://www.vmware.com/products/fusion/overview.html){:target="_blank"}

### VMware Tools for OS X from a ESXi host

VMware Tools for OS X will be install via the Command Line into the never booted version of OS X.

### Install OS X Mountain Lion.app

The newest version of "Install OS X Mountain Lion.app", by buying and downloading "OS X Mountain Lion" from the App Store.

Direct link to App Store: [https://itunes.apple.com/en/app/os-x-mountain-lion/id537386512?mt=12](https://itunes.apple.com/en/app/os-x-mountain-lion/id537386512?mt=12){:target="_blank"}

Once downloaded, don't actual run the installer.

Instead, go into your Applications folder, '/Applications', and locate the app called: 'Install OS X Mountain Lion'.

Right-click (or CTRL+click) on it, and chose 'Show Packages Contents', which will open a new Finder window, revealing the contents of the app.

In this new Finder window, navigate to the following folder:

Contents -> Shared Support

In here is a file called InstallESD.dmg.

This 'InstallESD.dmg' file is a "Virtual DVD" for installing Mountain Lion onto either a physical or virtual Mac.

{% include image.html img="/assets/2013/07/17/01-finder-installesd.png" alt-title="01-Finder-InstallESD.png" %}

### This series of blog posts consists of the following:

* Part 1 – Introduction and reason for doing this
* Part 2 – [Creating an never booted DMG using System Image Creator]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1-part-2 %})
* Part 3 – [Applying a configuration and exporting a Master, using System Image Creator]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1-part-3 %})
* Part 4 – [Clone the DMG to a Sparseimage file using Disk Utility.app and then install VMware Tools]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1-part-4 %})
* Part 5 – [Obtain VMware Tools from ESXi host and install into the Sparseimage]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1-part-5 %})
* Part 6 – [Converting the Sparseimage to VMDK format]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1-part-6 %})
* Part 7 – [Making the template in vCenter 5.1 using the never booted VMDK]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1-part-7 %})