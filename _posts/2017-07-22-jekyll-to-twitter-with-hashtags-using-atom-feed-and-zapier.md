---
layout: post
title: Jekyll to Twitter with Hashtags using Atom feed and Zapier
uuid: 4d5e9ad0-2e27-463a-8f4a-8476c52a23ad
date: 2017-07-22T09:30:00+02:00
twitterhashtags:
- Jekyll
- Liquid
- vExpert
- Zapier
tags:
- Atom
- Jekyll
- Liquid
- Zapier
---
I have previously used [IFTTT](https://ifttt.com){:target="_blank"} to push new blogpost onto Twitter and LinkedIn. But I was not 100% happy, so I recently switched to [Zapier](https://zapier.com){:target="_blank"} instead.

As part of the initial setup process at Zapier, I noticed that Zapier of cause pulled the relevant fields from my Atom feed, but also pulled some basic information directly from my website.

In this case, it pulled the Tags associated with the blogpost, although it called the field "raw_category"<!--break-->.

{% include image.html img="/assets/2017/07/22/zapier-atom-fleids.jpg" alt-title="Zapier Atom Fields" %}

This got me thinking if it would be possible to do some string manipulation as part of the "Create Tweet" step, and some how convert these Blog Tags into Twitter Hashtags.

After some thought and investigation, there arrived several issues with this approach:

* Zapier has a Formatter step, which could be used to do the string manipulation, but to use more than 2 steps in a Zap requires a paid account
* My Blog Tags is not a 1-to-1 match for a Twitter hashtag, so I would need to maintain a lookup table at Zapier, to translate a Blog Tag to a Twitter hashtag.

So my next approach was to add the wanted Twitter hashtags to the blogpost Front Matter, and then rewrite my Atom feed generating Liquid code to include a Custom Field that Zapier could pick up directly.

I did that, but that had a flaw as well, which was that Zapier only picks up specific fields. So my Atom feed contained the info, but Zapier could not see and use it.

Then I realized I had gotten the process all wrong. I had tried to solve 2 requirements with one output.
The 2 requirements was that both users and Zapier could get the relevant information from a single Atom feed.

The solution was to generate an extra Atom feed specifically for Zapier, which contained the complete Tweet content in the Title field of the Atom feed.

As part of that process, I also incorparated some logic, to ensure that the length of the Tweet would not exide the Twitter specifications.

The code produces a Tweet with the following format:

{% highlight text %}
New blogpost: title of blogpost #Hashtag1 #Hashtag2
{% endhighlight %}

In case the string exides Twitter limit, it will shorten the "title of blogpost" part, by subtracting one word until the length of the string is within the limit.

The result will look like this:

{% highlight text %}
New blogpost: title of... #Hashtag1 #Hashtag2
{% endhighlight %}

Below is Liquid code, which I have added as a "atomtweet" file in the "_includes" folder:
{% highlight text %}
{% raw %}
{% assign prefix = "New blogpost: " %}
{% assign twitterLimit = 116 %}

{% assign hashtags = "" %}
  
{% if include.post.twitterhashtags != empty %}
{% assign hashtags = " " %}
	{% for hashtag in include.post.twitterhashtags %}
  	{% if forloop.last == true %}
  		{% assign hashtags = hashtags | append: "#" | append: hashtag %}
  	{% else %}
  		{% assign hashtags = hashtags | append: "#" | append: hashtag | append: " " %}
  	{% endif %}
  {% endfor %}
{% endif %}
  
{% assign tweetContent = prefix | append: '"' | append: include.post.title | append: '"' | append: hashtags %}
  
{% if tweetContent.size > twitterLimit %}
	{% assign titleWordArray = include.post.title | split: " " %}
  	{% assign previousTest = prefix | append: '"' | append: titleWordArray[0] | append: '..."' | append: hashtags %}
  	{% assign testTitle = "" %}
  	{% for titleWord in titleWordArray %}
  		{% if forloop.first == true %}
  			{% assign testTitle = titleWord %}
  		{% else %}	
  			{% assign testTitle = testTitle | append: " " | append: titleWord %}
  		{% endif %}
  		{% assign nextTest = prefix | append: '"' | append: testTitle | append: '..."' | append: hashtags %}
  		{% if nextTest.size > twitterLimit %}
  			{% assign tweetContent = previousTest %}
  			{% break %}
  		{% else %}
  			{% assign previousTest = nextTest %}
  		{% endif %}
  	{% endfor %}
{% endif %}

{{ tweetContent | strip }}
{% endraw %}
{% endhighlight %}

I then created a copy of my normal "atom.xml" feed file, and renamed it to "atomtwitter.xml".  
Below is the content of the file, where the "atomtweet" include is used:

{% highlight xml %}
{% raw %}
---
layout: null
---

<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
	<title>{{ site.name }}</title>
	<subtitle>{{ site.description | xml_escape }}</subtitle>
	<link rel="alternate" type="text/html" href="{{ site.url }}"/>
	<link rel="self" type="application/atom+xml" href="{{ site.url }}/feed/atomtwitter.xml"/>
	<updated>{{ site.time | date_to_xmlschema  }}</updated>
	<id>urn:uuid:fc27bcfe-28db-43f2-b282-aa1903b63bd0</id>
	<author>
	    <name>{{ site.author }}</name>
		<uri>{{ site.url }}</uri>
	</author>{% for post in site.posts limit: 10 %}{% capture tweetContent %}{% include atomtweet post=post %}{% endcapture %}
	<entry>
    	<title>{{ tweetContent | strip }}</title>
		<link rel="alternate" type="text/html" href="{{ site.url }}{{ post.url }}"/>
		<id>urn:uuid:{{ post.uuid }}</id>
		<updated>{{ post.date | date_to_xmlschema  }}</updated>
		{% for tag in post.tags %}<category term="{{ tag | xml_escape }}"/>{% endfor %}
		<content type="html">
			{{ post.content | split:'<!--break-->' | first | escape }}
		</content>
	</entry>{% endfor %}
</feed>
{% endraw %}
{% endhighlight %}

Now it was just a matter of using the "Title" field in Zapier, as the main content of the Tweet and then add the "Link" field.

Job done.