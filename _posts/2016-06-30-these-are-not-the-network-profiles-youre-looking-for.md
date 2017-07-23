---
layout: post
title: These are not the Network Profiles you're looking for
uuid: 9e2e2a58-2c9f-4c10-b509-03fe0bea5be5
date: 2016-06-30T21:00:09+01:00
tags:
- vRealize&nbsp;Automation
---
{% include image.html img="/assets/2016/06/30/network-profiles-meme.jpg" alt-title="Network Profile Meme" %}

The other day I was working on a customers vRealize Automation platform, and faced a frustrating problem related to Network Profiles<!--break-->.

This customer is running a slightly older version of vRealize Automation, namely version 6.2.1.
The customer is using vRealize Automation to deploy un-customized deployments of a financial software they make. The deployments are then used for demoing and training purposes.

The deploy consist normally of 5 VMs each. And is deployed as a NAT'ed environment behind a vCNS Edge deployed by vRealize Automation. My task was to make it possible for them to do multiple deployments of VM number 5, and that these additional VMs should be customized using a normal vCenter Customization Specification.

I configured everything and did a test deployment. Everything look good at first, until I looked into the guest OS of the new additional server number 6. The server deployed fine, but it did not join the domain as specified in the vCenter Customization Specification. After some quick investigation it turned out that the VM did not get any DNS information set.
It was missing both the DNS server, the DNS search domain and the DNS search suffix.

I tried many different things.
* Verifying that the DNS information was set in the Network Profile in vRealize Automation.
* Hardcoding the IP and DNS information in the vCenter Customization Specification
* Hardcoding the IP and DNS information in the NIC settings for this VM in the Multi Machine Bluepring
* Providing "hardcoded" IP information doing runtime/deployment, specific for this VM

Non of these changed the outcome. The VM was still missing the DNS information and therefore did not join the domain.

After almost a day fighting this, I more or less stumbled upon the cause of this issue.

When making a NAT Network Profile you're required to provide all the relevant network information, including DNS information. Like the screenshot below.

{% include image.html img="/assets/2016/06/30/edit-network-profile-nat.jpg" alt-title="Edit Network Profile NAT" %}

Once finished inputting the relevant information, this Network Profile is now part of the systems network profiles.

{% include image.html img="/assets/2016/06/30/network-profiles-list.jpg" alt-title="Network Profiles List" %}

When looking in the Multi Machine Blueprint, you can see that this Network Profile is selected.

{% include image.html img="/assets/2016/06/30/blueprint-network-profile.jpg" alt-title="Blueprint Network Profile" %}

But this is not correct. What is actually select in the Multi Machine Blueprint, is a copy of the NAT Network Profile.
As seen in the above screenshot there is "Edit" icon next to the  Network Profile name.
First I thought that just allowed you to change this to another Network Profile.

But look what is actually presented, when clicking the "Edit" buttom.

{% include image.html img="/assets/2016/06/30/edit-blueprint-network-profile.jpg" alt-title="Edit Blueprint Network Profile" %}

So in this case, this Multi Machine Blueprint Network Profile must have been selected and copied at a very early stage of this installation, before all the relevant information was entered in the system Network Profile.

After updating the Multi Machine Blueprint Network Profile, with the missing DNS information, the deployed VM got the DNS information set and joined the domain as expected.
