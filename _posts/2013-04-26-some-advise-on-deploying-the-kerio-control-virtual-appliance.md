---
layout: post
title: Some advise on deploying the Kerio Control Virtual Appliance
uuid: df60e8e3-ed7b-47c3-b211-d3db7b877cfa
date: 2013-04-26T18:00:00+01:00
tags:
- ESXi
- Kerio
- Kerio&nbsp;Control
- VMware
- vSphere 
---
At my workplace, [Artwork Systems Nordic A/S](http://www.artwork-systems.dk), we have previously used the [Kerio Control Box 3110](http://www.kerio.com/control/control-box), as our firewall.

But do to that we have virtualized the main part of our servers, we decided to do the same with our firewall<!--break-->.

Kerio provides the Kerio Control product as both a Hardware Appliance, a Software Appliance and a Virtual Appliance.

*   The [Hardware Appliance](http://www.kerio.com/control/control-box) is their Kerio Control Box series
*   The [Software Appliance](http://www.kerio.com/control/software-appliance) is for installing directly onto your own server hardware
*   The [Virtual Appliance](http://www.kerio.com/control/virtual-utm) is a preconfigured VM, for use with either VMware vSphere or Parallels Server

## Upgrade the Virtual Hardware

As we now have a VMware vSphere setup, with 3 Mac Pro hosts, we of cause chose the Virtual Appliance version.

The Virtual Appliance version of Kerio Control, comes with Virtual Hardware based on the VMware Virtual Hardware <del>version 3</del> version 4, which limits the number of vNICs to a maximum of 4.

This can be quite limiting for a virtual firewall, do to that multiple VLANs on a single vNIC is not easy to do.

So my first advice is to upgrade the Virtual Hardware version, to the newest version compatible with your environment.

In my case this is Virtual Hardware version 9 (compatible with vSphere 5.1).

This will give you a maximum of 10 vNICs, which should be enough for most people.

## Change the vNIC adapter

The Kerio Control Virtual Appliance comes preconfigured with 2 vNICs, based on the “Flexible” adapter type.

We were have some performance issues, with our Virtual Appliance, which primarily showed it self, as a upload performance impact on VM’s running on the same host as the Kerio Control Virtual Appliance.

After speaking with Kerio Support, they suggest that I changed the vNIC adapter type from “Flexible” to “E1000”.

This meant shutdown the Kerio Control Virtual Appliance, and remove all the vNIC, and the re-adding them as “E1000”.

Before doing this, I wrote down all the MAC addresses, and manually entered them on the new “E1000” vNICs, so the Kerio Control software didn’t see change of NICs, and thereby I didn’t have to reconfigure the Kerio Control software.

After during this, the performance was as expected, including for VM’s running on the same host as the Kerio Control Virtual Appliance.

## Conclusion

So the bottom line is, upgrade the Virtual Hardware to the newest possible for your environment and remove the preconfigured vNICs based on the “Flexible” adapter, and add vNICs based on the “E1000” adapter instead.
