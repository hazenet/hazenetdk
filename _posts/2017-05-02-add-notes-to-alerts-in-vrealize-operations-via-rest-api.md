---
layout: post
title: Add Notes to Alerts in vRealize Operations via REST API
uuid: 7f52ef68-82a0-41c4-b5f7-9470c35f4f0e
date: 2017-05-02T21:00:00+02:00
tags:
- vRealize&nbsp;Operations
- REST&nbsp;API
---

As part of a larger project for a customer, I needed to add Notes to Alerts in vRealize Operations, via the REST API.

According to the REST API documentation of vRealize Operations, found at:

{% highlight text %}
https://ip-or-fqn-of-vrops/suite-api/ 
{% endhighlight %}

The request should be a POST against:

{% highlight text %}
https://ip-or-fqn-of-vrops/suite-api/api/alerts/{id}/notes
{% endhighlight %}

Where {id} is the ID of the Alert, you want to add the Note to.

But the vRealize Operations REST API documentation is faulty, which made using it somewhat difficult<!--break-->.

According to documentation, the body content of the request can either be en JSON format or XML format.

**JSON sample according to documentation:**
{% highlight json %}
{
  "id" : "ea3f7bcc-12f0-432b-9ba4-a808b14b8891",
  "alertId" : "0d9ff4f7-1603-43c9-b51d-db2b5b47c65e",
  "creationTimeUTC" : 0,
  "type" : "USER",
  "userName" : "testUser",
  "note" : "sample note",
  "others" : [ ],
  "otherAttributes" : {
  }
}
{% endhighlight %}

**XML sample according to documenation:**
{% highlight xml %}
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ops:alert-note id="ea3f7bcc-12f0-432b-9ba4-a808b14b8891" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ops="http://webservice.vmware.com/vRealizeOpsMgr/1.0/">
    <ops:alertId>0d9ff4f7-1603-43c9-b51d-db2b5b47c65e</ops:alertId>
    <ops:creationTimeUTC>0</ops:creationTimeUTC>
    <ops:type>USER</ops:type>
    <ops:userName>testUser</ops:userName>
    <ops:note>sample note</ops:note>
</ops:alert-note>
{% endhighlight %}

There are at least two issues with these samples.

1. How would I know the ID of the Note I am adding, before I have added it?
2. They do not work at all.

Because the REST API calls not working, I reached out to [Alan Renouf](https://twitter.com/alanrenouf){:target="_blank"}, Senior Product Manager for API/SDK/CLI at VMware, via Twitter and [VMware {code} Slack](https://code.vmware.com/web/code/join){:target="_blank"}.

Alan Renouf did not have the answers to these failing REST API calls him self, but managed to find some engineers who did work on this REST API.

So now I was in contact with 2 engineers, Nandu Mallapragada who had priviously work on this REST API and Suren Balikyan, who currently works on this REST API.

With there help we figured out what the correct body content of the REST API Request should be.

**Correct JSON body content:**
{% highlight json %}
{
  "content": "Replace with note text"
}
{% endhighlight %}

**Correct XML body content:**
{% highlight xml %}
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ops:alert-note-content xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:ops="http://webservice.vmware.com/vRealizeOpsMgr/1.0/">
    <ops:content> Replace with note text </ops:content>
</ops:alert-note-content>
{% endhighlight %}

Nice and simple, but best of all, actually working :-)

A big thanks to Alan Renouf, Nandu Mallapragada and Suren Balikyan.
