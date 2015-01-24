---
layout: post
title: VCAP-DCA, Completed successfully
uuid: 2cac534c-367c-4348-a236-2a39225f0e5e
date: 2014-09-20T18:00:00+01:00
tags:
- Certification
- VMware
---
## My exam story:

I sat my VMware VCAP-DCA exam on Monday 15th of September, at Arrow ECS' Test Center in Ballerup, Denmark, at 09.30am.

I had scheduled it for 10.00am, but as the Test Center is a 240km drive away, I of cause left home very early Monday morning to be safe.

And because there was no issue with traffic, I arrived in good time, and was given the option to start my exam early.

About one hour into my exam, the connection to the remote lab environment broke down<!--break-->.

My first thought was, "Have I screwed up the lab environment, and am I now locked out of it?"

But the my brain got a hold of it self, and I remembered that I was not actively doing work in the lab at the time, I was at the moment reading a piece of the documentation to help me with the current task, which is in a separate window, available outside the RDP session that is used to connect to the lab environment.

So I decided to re-read the current task, hoping that I would be able to reconnect again shortly.

After about a minute, I was finished re-reading the task, but I was still unable to re-connect the RDP session to the lab environment.

So I decide to give it a minute or two more, while I would read the next few tasks.

When I click "Next" to get to the next tasks, the Task window stopped working, and just showed a blank white screen.

Then I knew that it was not myself that had messed up the connection to the lab environment, but instead the issue must be some network-related issues outside my control.

I tried to get a hold of the Exam Administrator, but there was nobody in the room next to the exam-room, where the Exam Administrator should have been.

I then started walking back and forth between the Exam Administrator room, and my exam PC, in the hopes that then network connection would come back up. That went on for about 8-10 minutes, to rather much disturbance for a female co-exam taker in the same room, taking her VMware VCP exam. The reason for my "slight" panicking, was that I had at the moment no idea what the problem was and I did not know if the clock was still "ticking" inside my exam.

Finally the Exam Administrator was back, and said that the exam had broken down.

First thing, was a quick verification that there was an issue, and afterwards the Exam Administrator found out that the network connection the central testing servers was down.

I was informed that to get the connection back up, the local testing setup needed to be restarted, but that could not be down while the female co-exam taker was still working on her VCP exam, which by the way was cached locally, and was there for unaffected by the network connection issues.

So I had to wait until she was done with her VCP exam. So I sat down outside the exam room in a lounge chair, and waited for about 30-45 minutes while trying to relax. The female co-exam taker was done and was happy to have passed her VCP exam.

The local testing setup was restarted, and I could reconnect to my lab environment, and was happy to see that I had only missed a couple of minutes, according to my memory of that the clock was showing before the network connection broke down.

The rest of the exam went without trouble.

And about 12 minutes before the time ran out, and had finished all tasks, except one where I suspected an issue in the lab environment, which was outside the scope of the exam.

After about 25-30 minutes, I received a mail stating that I had passed the VCAP-DCA exam.

## My tips to preparation:

*   Know about and have worked with as many VMware products, listed in VCAP-DCA blueprint as possible, preferably all of them.
*   If you have access to PluralSight, watch the [VMware vSphere Optimize &amp; Scale](http://pluralsight.com/training/Courses/TableOfContents/vmware-vsphere-optimize-scale-pt1){:target="_blank"} course by [Jason Nash](http://jasonnash.com){:target="_blank"}
*   Start using the vSphere Web Client in your daily work, as many of the tasks either requires you to use it, or it is just easier to complete a given task in the vSphere Web Client.
*   Know your way around the vSphere Management Assistant (vMA), as that is the suggested CLI access method in the lab environment.
*   Know how to use PowerCLI and how to read and edit a PowerCLI script, as that will possibly come in handy.
*   Buy and read the [VCAP5-DCA Official Cert Guide: VMware Certified Advanced Professional 5- Data Center Administration](http://www.pearsonitcertification.com/store/vcap5-dca-official-cert-guide-vmware-certified-advanced-9780789753236){:target="_blank"}, as suggested by [Christian Mohn](http://vninja.net){:target="_blank"} in his recent blog post, ["My VCAP-DCA 550 Experience"](http://vninja.net/vmware-2/vcap-dca-550-experience/){:target="_blank"} (I did not personally buy and read this book, so I can't comment on how good it is, but it is the official certification guide-book)
*   Use the ["VCAP5-DCA 5.5 Study Sheet"](http://wahlnetwork.com/2012/07/02/the-vcap5-dca-study-sheet/){:target="_blank"} provided by [Chris Wahl](http://wahlnetwork.com){:target="_blank"}, to track your progress in your study.
*   Have a look at [Mike Preston](http://blog.mwpreston.net){:target="_blank"}'s ["8 weeks of VCAP"](http://blog.mwpreston.net/8-weeks-of-vcap/){:target="_blank"} blog series, where he walks thru a lot of sample scenarios related to the VCAP-DCA exam.

## My tips to the exam:

*   Manage your time, and initially skip tasks if your are uncertain on how to solve them. You can always come back to them, if there is time later on. If you skip a task, write down the task number, and maybe a keyword or brief description on the note board provided to you. (There is not review overview of all the tasks/questions in the VCAP-DCA exam)
*   Know how to do [searches across multiple PDF's](http://www.ghacks.net/2011/04/02/how-to-search-multiple-pdf-documents-at-once/){:target="_blank"}, that way you can more quickly search all the PDF documentation for a given keyword, if you are uncertain which PDF file to look in. (I believe the provided PDF reader was Foxit Reader, but I can't remember 100%.)
*   If you know a specific task can be done in the vSphere Client (Windows C# client), then do it that way, because I felt it was quicker to work with and more responsive, considering there are some lag/slowness in the lad environment.
*   Always take your time, when reading a task, because you can easily miss crucial information,  if you just skim the provided text for the task.

## A little note about the result:

When I received the email with the exam results, one of the first things my eyes and brain noticed, was that I had only just passed, because the score report stated that the "Passing Score" was 300 points and my score was also 300 points.

So I thought "Hot damn, that was a close call". But after thinking about it for a couple of minutes, it did not make any sense to me. I had completed 22 out of 23 tasks, more than several people I knew that had taken the VCAP-DCA exam. And I did not feel I had made any major mistakes.

So I reached out to a couple of people. So I personally knew and others I found on Twitter, who had all recently taken their VCAP-DCA (the version based on 5.5) exam.

And they all informed me that they had scored exactly 300 points.

So it seems that VMware/Pearson Vue, does not provide you with the actual score, but rather just informs you whether or not you have passed the exam.

(I have no confirmation from neither VMware or Pearson Vue that this is the case, it is just my own personal theory).