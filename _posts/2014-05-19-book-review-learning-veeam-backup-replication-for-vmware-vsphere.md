---
layout: post
title: Book Review – Learning Veeam Backup & Replication for VMware vSphere
uuid: 26a34645-4cb8-4369-867a-6215d85966d2
date: 2014-05-19T18:00:00+01:00
tags:
- Book&nbsp;Review
- Veeam
- Veeam&nbsp;Backup&nbsp;&&nbsp;Replication
- VMware
---
### *<span style="color: red;">Disclaimer:</span>*

*I have received this book as a free review sample, with the only requirement that I would write a review of it here on my blog and post short reviews of it on amazon.com, goodreads.com and books.dzone.com. These should be unbiased and I was in no way obligated to write positive reviews.*

{% include image.html img="/assets/2014/05/19/learning-veeam-backup-and-replication.jpg" alt-title="Learning Veeam Backup and Replication" %}

The book is available in both eBook and Print versions from [Packt Publishing](http://www.packtpub.com/learning-veeam-backup-and-replication-for-vmware-vsphere/book?utm_source=Blogs&amp;utm_medium=Links&amp;utm_campaign=create.com)<!--break-->

I know Christian Mohn, the author of  "Learning Veeam Backup &amp; Replication for VMware vSphere" from Twitter ([@h0bbel](https://twitter.com/h0bbel){:target="_blank"}), his blog [vNinja.net](http://vninja.net){:target="_blank"} and I have also listened to a few of his podcasts, [vSoup](http://vsoup.net){:target="_blank"}, which he does regularly with co-presenters Ed Czerwin ([@eczerwin](https://twitter.com/eczerwin){:target="_blank"}) and Chris Dearden ([@ChrisDearden](https://twitter.com/chrisdearden){:target="_blank"}).

The book is not that long, only 110 pages, and is easily read. It gives a very good overview and introduction to Veeam Backup & Replications for people who are not familar with it beforehand.

The structure of the book is mostly like a guide, divided into 5 chapters, providing the reader with a step by step guide on how to setup Veeam Backup &amp; Replication from scratch.

## Chapter 1 - Introduction to Veeam Backup &amp; Replication v7 for VMware

Chapter 1 gives a good introduction to backup terms RPO and RTO. Then moves onto describing the components of Veeam Backup &amp; Replication, and ends with a detailed guide on how to install and patch Veeam Backup &amp; Replication v7.

## Chapter 2 - Configuring Backups

Chapter 2 walks through configuring backup repositories (the destination where backups are stored) and then describes the different transport modes that Veeam Backup &amp; Replication support. After that there is a detailed description of the backup modes, "Incremental backup", "Incremental backup with synthetic full" and "Reversed incremental backup".

The chapter ends with a guide on how to configure first a virtual backup proxy (which is the processing engine in Veeam Backup &amp; Replication), then a backup job, a tape backup job and lastly a backup copy job. All this to live up to the "3-2-1 Backup Rule", which states the following:

*   Have at least **three copies of your data**.
*   Store the copies on **two different media**.
*   Keep **one backup copy offsite**.

## Chapter 3 - Restoring Data

Backups are nice, but it is the restore that counts. So in this chapter some of the different restore options is detailed, all of which is possible from a single image based backup file.

The chapter walks through the following restore options:

*   Performing Instant VM Recovery
*   Performing Full VM Restore
*   Restoring VM files
*   Restoring VM Guest files

## Chapter 4 - Replicating Virtual Machines

To provide very fast recovery of services Veeam Backup &amp; Replication gives the possibility to replicate VMs to either a different ESXi host in the same site, to a different datastore or to a remote ESXi host and a remote datastore. This can give the protection against a whole datacenter failure.

Replication creates a "shadow" VM which is powered off and where data is replicated to, every few minutes (if needed). Should there be a failure, it is simple a matter of failing over to the replicated "shadow" VM, and services should be up and running within a few minutes.

This chapter discuses the replication infrastructure components, how to setup a replication job, how to failover to a "shadow" VM and how to failback to the original VM.

## Chapter 5 - Other Features

The last chapter discuses some of the other / advanced features, which includes SureBackup, SureReplica, Universal Application-Item Recovery (U-AIR), Quick Migration, SAN Snapshot integration, vCloud Director, Veeam Backup Enterprise Manager and Veeam Backup Search.

That is a lot of features to put into a single chapter, which also mean that the level of detail in this chapter is limited compared to the earlier chapters. But it still succeeds in given a good overview of these "other features".

## Conclusion

This is a very good book, if you have some experience with VMware vSphere, but are new to Veeam Backup &amp; Replication. It walks you through every step of the way to get a Veeam infrastructure setup, and getting your VMs backed up and replicated. And most importantly it gives you the knowledge on how to restore VMs and data from those backups.

The book is available in both eBook and Print versions from [Packt Publishing](http://www.packtpub.com/learning-veeam-backup-and-replication-for-vmware-vsphere/book?utm_source=Blogs&amp;utm_medium=Links&amp;utm_campaign=create.com){:target="_blank"}.