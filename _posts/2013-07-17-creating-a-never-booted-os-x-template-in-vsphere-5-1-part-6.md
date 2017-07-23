---
layout: post
title: Creating a never booted OS X template in vSphere 5.1 - Part 6 - Converting the Sparseimage to VMDK format
uuid: 494b5258-8332-4628-b7b8-ecb475a518da
date: 2013-07-17T16:00:00+01:00
tags:
- ESXi
- Mac&nbsp;OS&nbsp;X
- vCenter
- VMware
- vSphere
---
The next thing is to convert our Sparseimage to VMDK format. For during this I will be using to Command Line utilities that are installed as part of VMware Fusion.

I would like to thank, a former colleague of mine, Alan Gordon, who is Chief Technology Officer at [Humac Group](www.humac.dk) for writing a article at [Krypted.com](http://krypted.com/mac-os-x/how-to-move-a-physical-machine-server-to-a-vmware-vm/) on how to do this<!--break-->.

First off, open 'Disk Utility', located at '/Applications/Utilities/', and select the volume called 'ServerHD' from the list of disks, as shown in the screenshot below.

{% include image.html img="/assets/2013/07/17/26-disk-utility-unmount.png" alt-title="26-Disk-Utility-Unmount.png" %}

Now click the button named 'Unmount' in the top of the window.

The text 'ServerHD' in the list of disks, should now be dimmed slightly.

While the volume 'ServerHD' is still selected, click the button named 'Info' in the top of the window. This will bring up a information window, containing detailed information about the volume 'ServerHD'.

{% include image.html img="/assets/2013/07/17/27-disk-utility-info.png" alt-title="27-Disk-Utility-Info.png" %}

In this case we are interested in the information called 'Disk Identifier'. In my case this is 'disk2s2&#8242;, note down the disk number, in my case 'disk2&#8242;.

Now close the 'Disk Utility' application.

Open up 'Terminal' located in '/Applications/Utilities/'.

Run the following command:

{% highlight bash %}
cd /Applications/VMware\ Fusion.app/Contents/Library/
{% endhighlight %}

Using the Command Line utility called 'vmware-rawdiskCreator', I will create a VMDK, which actually links to the Sparseimage, using the below command.

Please adjust the command with the disk number ('disk2&#8242;), noted down earlier, and with a output path and file name of your choice ('/Users/mads/Desktop/OS-X-Template-link').

{% highlight bash %}
./vmware-rawdiskCreator create /dev/disk2 fullDevice /Users/mads/Desktop/OS-X-Template-link lsilogic
{% endhighlight %}

In my case I now have a VMDK file on my Desktop called 'OS-X-Template-link.vmdk'. But this is in fact a empty VMDK file, linking to the Sparseimage.

Using the Command Line utility called 'vmware-vdiskmanager', I will now convert the VMDK-link file to a actual VMDK file containing the contents of the Sparseimage.

Run the below command, and as before change the input file ('/Users/mads/Desktop/OS-X-Template-link.vmdk') and output file ('/Users/mads/Desktop/OS-X-Template.vmdk'), with the files of your choice.

{% highlight bash %}
./vmware-vdiskmanager -r /Users/mads/Desktop/OS-X-Template-link.vmdk -t 4 /Users/mads/Desktop/OS-X-Template.vmdk
{% endhighlight %}

The '4' option in the above command, specifies that the output file should be in the format 'preallocated ESX-type virtual disk', which will generate a preallocated VMDK usable on ESX and ESXi hypervisiors. In my case this will amount to a 30GB VMDK file on my Desktop.

This command takes quite some time to finish, but it displays progress information along the way.

When it is finished, you can delete the Link file ('/Users/mads/Desktop/OS-X-Template-link.vmdk'), because it is not needed any more.

Also you can open up 'Disk Utility' located in '/Applications/Utilities/' and eject the Sparseimage file 'ServerHD.sparseimage'

I now have two VMDK files on the Desktop:

OS-X-Template.vmdk
OS-X-Template-flat.vmdk

The 'OS-X-Template.vmdk' is a descriptive file, containing information about the actual storage VMDK file, called 'OS-X-Template-flat.vmdk'. They are both relevant, as they together form the VMDK disk I will be uploading to the Datastore in vCenter.

### This series of blog posts consists of the following:

* Part 1 – [Introduction and reason for doing this]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1 %})
* Part 2 – [Creating an never booted DMG using System Image Creator]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1-part-2 %})
* Part 3 – [Applying a configuration and exporting a Master, using System Image Creator]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1-part-3 %})
* Part 4 – [Clone the DMG to a Sparseimage file using Disk Utility.app and then install VMware Tools]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1-part-4 %})
* Part 5 – [Obtain VMware Tools from ESXi host and install into the Sparseimage]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1-part-5 %})
* Part 6 – Converting the Sparseimage to VMDK format
* Part 7 – [Making the template in vCenter 5.1 using the never booted VMDK]({% post_url 2013-07-17-creating-a-never-booted-os-x-template-in-vsphere-5-1-part-7 %})
