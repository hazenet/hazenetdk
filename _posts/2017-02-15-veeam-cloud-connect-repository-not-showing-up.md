---
layout: post
title: Veeam Cloud Connect repository not showing up
uuid: e4c84a7e-968b-47f6-883b-0d03ef6e13f4
date: 2017-02-15T22:00:00+01:00
tags:
- Veeam
- Veeam&nbsp;Backup&nbsp;&&nbsp;Replication
---

The other day we had a customer having some issues with a Veeam Cloud Connect repository not showing up after connecting to our Veeam Cloud Connect service.

The customer had previously tested our service, and was now signing up for good. The account they used for testing had recently been deleted, so the customer was provided a new account and a fresh Veeam Cloud Connect Repository.

When the customer signed in with the newly provided credentials, the sign in work as expected, but the Veeam Cloud Connect repository did not show up in the customers list of repositories<!--break-->.

After a bit of troubleshooting we found the issue.  
According to this list of [Limitations for Cloud Repository](https://helpcenter.veeam.com/docs/backup/cloud/cloud_connect_limitations.html?ver=95){:target="_blank"}, if the following are true:

* Customer is running Veeam Backup & Replication version 9
* Service Provider is running Veeam Backup & Replication version 9.5
* Service Provider is using an Scale-Out Backup Repository (SOBR) as the backend for the Cloud Repository

Then this situation will happen.
The customer can sign in without issues, but the Cloud Repository will not show up.

The part that was playing tricks on us, was that we in between the customer testing our service and when they signed up for good, had changed our backend from normal Cloud Repositories to Cloud Repositories backed by an SOBR.  
So what worked just a few days ago, did no longer work.

The solution is to either provide the customer with a traditional Cloud Repository not backed by an SOBR or to upgrade the customers installation to Veeam Backup & Replication version 9.5.

We chose to upgrade the customers installation to version 9.5.  
After the upgrade finished and we rescanned the Service Provider connection the Cloud Repository showed up as expected.
