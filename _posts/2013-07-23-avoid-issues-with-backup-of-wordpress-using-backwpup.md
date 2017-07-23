---
layout: post
title: Avoid issues with backup of WordPress using BackWPup
uuid: 062740bd-1f92-4d2f-9ef2-80af2f4d5859
date: 2013-07-23T18:00:00+01:00
tags:
- Backup
- WordPress
---
I have used [BackWPup](http://wordpress.org/plugins/backwpup/){:target="_blank"} in the past to do backup of this [WordPress](http://wordpress.org){:target="_blank"} based website, but recently I encountered some problems.

In my original BackWPup setup there was a simple BackWPup-job that just created a ZIP-archive of everything WordPress related at my webhost, [One.com](http://www.one.com/){:target="_blank"}, and then sent that ZIP-archive to my [Dropbox.com](https://www.dropbox.com/){:target="_blank"} account for offsite storing.

But recently I started receiving error-emails, that the backup did not finish correctly<!--break-->.

I got log-entries like this:

{% highlight text %}
[21-Jul-2013 03:00:56] 1. Trying to make a list of folders to back up …
[21-Jul-2013 03:01:02] 136 folders to back up.
[21-Jul-2013 03:01:02] 1. Trying to generate a file with installed plugin names …
[21-Jul-2013 03:01:02] Added plugin list file "Hazenet.dk_.pluginlist.2013-07-21.txt" with 2.05 kB to backup file list.
[21-Jul-2013 03:01:03] 1. Trying to create backup archive …
[21-Jul-2013 03:01:03] Compression method is ZipArchive
[21-Jul-2013 03:11:39] WARNING: Job restart due to inactivity for more than 5 minutes.
[21-Jul-2013 03:16:41] WARNING: Job restart due to inactivity for more than 5 minutes.
[21-Jul-2013 03:22:41] WARNING: Job restart due to inactivity for more than 5 minutes.
[21-Jul-2013 03:22:42] 1. Try to send backup file to Dropbox …
[21-Jul-2013 03:22:48] Authenticated with Dropbox of user Mads Fog Albrechtslund
[21-Jul-2013 03:22:48] 1.93 GB available on your Dropbox
[21-Jul-2013 03:22:48] Uploading to Dropbox …
[21-Jul-2013 03:26:15] ERROR: Uploaded file size and local file size don't match.
[21-Jul-2013 03:26:15] 2. Try to send backup file to Dropbox …
[21-Jul-2013 03:26:16] Authenticated with Dropbox of user Mads Fog Albrechtslund
[21-Jul-2013 03:26:16] 1.81 GB available on your Dropbox
[21-Jul-2013 03:26:16] Uploading to Dropbox …
[21-Jul-2013 03:26:18] ERROR: Uploaded file size and local file size don't match.
[21-Jul-2013 03:26:18] 3. Try to send backup file to Dropbox …
[21-Jul-2013 03:26:19] Authenticated with Dropbox of user Mads Fog Albrechtslund
[21-Jul-2013 03:26:19] 1.81 GB available on your Dropbox
[21-Jul-2013 03:26:19] Uploading to Dropbox …
[21-Jul-2013 03:26:22] ERROR: Uploaded file size and local file size don't match.
[21-Jul-2013 03:26:22] Job has ended with errors in 1529 seconds. You must resolve the errors for correct execution.
{% endhighlight %}

The problems are the lines regarding, 'WARNING: Job restart due to inactivity for more than 5 minutes.' and 'ERROR: Uploaded file size and local file size don't match.'

I started digging into this problem, and found some other people having similarly problems with BackWPup.

The best explanation was that the archive took to long to create, and that the BackWPup-job would try to restart, resulting in a archive-file that still was growing, when the BackWPup-job is trying to upload the file to Dropbox, which then caused the error, 'ERROR: Uploaded file size and local file size don't match.'

The way to fix this is to split the complete BackWPup-job into smaller individual BackWPup-jobs. As described in the FAQ section of the BackWPup page: [http://wordpress.org/plugins/backwpup/faq/](http://wordpress.org/plugins/backwpup/faq/){:target="_blank"}

> **Backup jobs are running forever!**
> 
> Almost all web hosts have limited allowed script execution time on their servers. As a consequence, BackWPup might be “interrupted” in its job execution when executing the job takes longer than script execution is allowed for by the server (i.e. when the job requires to add a lot of files to a ZIP archive). Whenever BackWPup’s execution is stopped by the server, it waits 5 minutes before it tries to restart the job. If it is stopped again, it waits another five minutes. Those interruptions can then add up to what looks like 20-40 minutes of execution while really most of it is waiting time for a job to be restarted.
> 
> A remedy in this case can be splitting a large file backup into smaller chunks. For example, create one backup job for your WordPress installation, but exclude /wp-content/. Create another job for /wp-content/. If your site has a lot of uploaded photos, maybe even go further, exclude /uploads/ from your /wp-content/ backup and create a third job for /uploads/.

I decided to split my complete BackWPup-job into as many pieces as possible, to be sure I would not bump into this issue again anytime soon.

I split the complete BackWPup-job into the following individual BackWPup-jobs:

1.  WordPress Database
2.  WordPress Install
3.  WordPress Plugins
4.  WordPress Content
5.  WordPress Uploads
6.  WordPress Manual Uploads

# WordPress Database

This is a simple database dump, which I chose to run first.

In the 'General' tab of this job in BackWPup, give the job a name, in my case 'Hazenet WP Database' and select only 'Database backup' in the section 'This job is a …'.

Specify a 'Archive name', preferably with both date and time in it.

In the 'Archive format' section i chose 'Tar Gzip', because the 'Zip' performance at my webhost is not very good.

Select a 'Job destination', in my case it was 'Dropbox'.

If you want log info sent, specify a TO and a FROM email address, and select if it only should sent a email in case of errors.

{% include image.html img="/assets/2013/07/23/01-hazenet-wp-database-general.png" alt-title="01-Hazenet-WP-Database-General.png" %}

In the 'Schedule' tab of the job, specify how you want to run this job.

In my case, I chose to run it as a WordPress cron job, and selected a 'Sceduler type' of 'basic'. And specified a daily time to run it.

In the 'DB Backup' tab of the job, select at minimum all the WordPress related database tables.

At default they start with 'wp_'.

Give the dumpfile a name, and whether or not to do compression on the database dumpfile it self.

Remember not to run double compression, both a job 'Archive format' and at the database dumpfile.

The last thing is to setup the 'Job destination'.

It will be the last tab in the job, in my case called 'To: Dropbox'.

Depending on which type of destination you have chosen on the 'General' tab, this tab will have different names, and will have different options.

Regarding 'Dropbox', there is a few settings.

There is 2 options for 'Authenticaiton', either 'Sandbox' or 'Full Dropbox'.

Sandbox, will only grant BackWPup access to a close area of your Dropbox account, more precisely 'Dropbox root/Apps/BackWPup', which it will generate automatically when needed.

Full Dropbox, will give BackWPup full access to your Dropbox, and further down 'TO: Dropbox' tables, you have the option to specify a 'Folder in Dropbox' where you want to store the archive files.

The last setting, relates to how many files you want this job to store in Dropbox, before it starts to delete the oldest ones.

# WordPress Install

This BackWPup-job will do a backup of all the basic WordPress related files and folders.

Follow the same instructions as for the 'WordPress Database'.

But in the 'This job is a …' section only select 'File backup'.

{% include image.html img="/assets/2013/07/23/02-hazenet-wp-install-general.png" alt-title="02-Hazenet-WP-Install-General.png" %}

Now this gives you a tab called 'Files', in here few settings regarding which folders this BackWPup-job should contain.

I chose that this BackWPup-job only should contain two things.

First the root folder of the webhost, containing alot a induvidual WordPress related files. In my case it also contains a few non-WordPress related folders, which I chose to exclude from the 'Backup root folder' section.

Secondly I selected that this BackWPup-job should also contain the themes for WordPress, so I selected to include 'Backup themes'.

Leave the 'Exclude files/folders from backup' section as default, '.DS_Store,.git,.svn,.tmp,desktop.ini'

And in the bottom, leave the 'Include special files' checked.

{% include image.html img="/assets/2013/07/23/03-hazenet-wp-install-files.png" alt-title="03-Hazenet-WP-Install-Files.png" %}

Remember to set a slightly different Schedule time, so as this BackWPup-job does not run at the same time as any other BackWPup-jobs.

# WordPress Plugins

This will more or less be a clone of the 'WordPress Install' BackWPup-job, which is easy to do.

On the 'Jobs' screen of BackWPup, hover the mouse cursor over the 'WordPress Installation' BackWPup-job, and select 'Copy'.

This will generate a new BackWPup-job with the same settings as the 'WordPress Install' BackWPup-job, only called 'Copy of WordPress Install'.

Edit this copied job, and change the name to some different, like 'WordPress Plugins'

In the 'General' tab, under the 'This job is a …' select both 'File backup' and 'Installed plugins list'

{% include image.html img="/assets/2013/07/23/04-hazenet-wp-plugins-general.png" alt-title="04-Hazenet-WP-Plugins-General.png" %}

In the 'Files' tab, deselect 'Backup root folder' and select instead 'Backup plugins'

In the bottom of the screen deselect the 'Include special files' option.

{% include image.html img="/assets/2013/07/23/05-hazenet-wp-plugins-files.png" alt-title="05-Hazenet-WP-Plugins-Files.png" %}

In the 'Plugins' tab, specify a name in the 'Plugin list file name' field, and chose not to do any compression on the Plugin file list.

Remember to set a slightly different Schedule time, so as this BackWPup-job does not run at the same time as any other BackWPup-jobs.

# WordPress Content

Do a copy of the 'WordPress Plugins' BackWPup-job, and rename it to something like 'WordPress Content'.

In the 'General' tab, deselect 'Installed plugins list'.

{% include image.html img="/assets/2013/07/23/06-hazenet-wp-content-general.png" alt-title="06-Hazenet-WP-Content-General.png" %}

In the 'Files tab, deselect 'Backup plugins' and instead select 'Backup content folder'

{% include image.html img="/assets/2013/07/23/07-hazenet-wp-content-files.png" alt-title="07-Hazenet-WP-Content-Files.png" %}

Remember to set a slightly different Schedule time, so as this BackWPup-job does not run at the same time as any other BackWPup-jobs.

# WordPress Uploads

Do a copy of the 'WordPress Content' BackWPup-job, and rename it to something like 'WordPress Uploads'.

{% include image.html img="/assets/2013/07/23/08-hazenet-wp-uploads-general.png" alt-title="08-Hazenet-WP-Uploads-General.png" %}

In the 'Files' tab, deselect 'Backup content folder' and instead select 'Backup uploads folder'

If you have any folders inside you WordPress uploads folder you don't want included, then exclude the from the sub-options of 'Backup uploads folder'.

In my case, I have a 'Manual uploads' folder, which contains larger ZIP archives, which I don't want included in this BackWPup-job.

{% include image.html img="/assets/2013/07/23/09-hazenet-wp-uploads-files.png" alt-title="09-Hazenet-WP-Uploads-Files.png" %}

Remember to set a slightly different Schedule time, so as this BackWPup-job does not run at the same time as any other BackWPup-jobs.

# WordPress Manual Uploads

If you have any extra folders, you want to backup then follow along.

Do a copy of the 'WordPress Uploads' BackWPup-job, and rename it. In my case, I chose to call it 'Hazenet WP Manual Uploads' because as described earlier I have a Manual Uploads folder inside the WordPress Uploads folder, where I store larger ZIP archive files, related to some of my WordPress blogposts.

In my case, because the 'Manual Uploads' folder already contains compressed files, I selected a 'Archive format' of 'Tar' instead of the earlier used 'Tar Gzip', because there is no reason to do double compression.

{% include image.html img="/assets/2013/07/23/10-hazenet-wp-manual-uploads-general.png" alt-title="10-Hazenet-WP-Manual-Uploads-General.png" %}

In the 'Files' tab, deselect all checkboxes, and instead and the full path to the folder or folders you want to include, in the 'Extra folders to backup' section.

In my case the full path was:

/customers/b/c/1/hazenet.dk/httpd.www/wp-content/uploads/manual-uploads/

{% include image.html img="/assets/2013/07/23/11-hazenet-wp-manual-uploads-files.png" alt-title="11-Hazenet-WP-Manual-Uploads-Files.png" %}

Remember to set a slightly different Schedule time, so as this BackWPup-job does not run at the same time as any other BackWPup-jobs.

# Final words

So once again have a functional backup of my WordPress site, and as a bonus it is now more scalable than before.
