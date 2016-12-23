---
layout: post
title: Executing Actions in vRealize Orchestrator
uuid: 5285768e-a52c-4642-849d-40e0c320307a
date: 2016-11-25T22:50:16+01:00
tags:
- vRealize&nbsp;Orchestrator
---

In vRealize Orchestrator it is always best to make your code modular, either as individual Workflows or as Actions.
Actions is structured in Modules (which in the vRealize Orchestrator client is shown as folders)

The normal way to execute a action is like this:

{% highlight javascript %}
actionResult = System.getModule("com.vmware.library.date").addHoursToDate(date,hours);
{% endhighlight %}

To break this down a bit<!--break-->:  

- actionResult = This is the output of the action
- System.getModule("com.vmware.library.date") = A system call to find a given module
- addHoursToDate = This is the name of the actual action
- (date,hours) = These are the required inputs to this specific Action

This is all good, if you have the Module and Action as "static" elements and want to hardcode them in e.g. a Scriptable Task or another Action.

But let's say you have a lot of actions in a specific module. The actions may have a naming format, like "Action0001_descriptiveText".

Now if you have the Action "number" you should be able to find that Action, and then potentially execute that action "dynamically".

According to the API documentation of vRealize Orchestrator there should be a attribute on a Module, called "Module.actions" which should return a Array of Actions.

Unfortunately that does not work.  
After posting this question in the [vRealize Orchestrator VMTN Forum, Ilian Iliev quickly posted a solution](https://communities.vmware.com/message/2633578){:target="_blank"}.

So instead of using "Module.actions", the attribute is actually called "Module.actionDescriptions".  
This is not documented anywhere, and it does not make much sense. But it works.

This will return a Array of Actions, which you can now loop thru or filter on to find the Action you are looking for.

Now let's asume you have the Module as a object in your Scriptable Task, let's call it "theModule" and you wanted to just execute the first Action in this Module. This could then be done like this:

{% highlight javascript %}
actionResult = theModule[theModule.actionDescriptions[0].name](parameter1, parameter2);
{% endhighlight %}

This can make your action execution more dynamic, but it has one downside.

When building a vRealize Orhcestrator Package, the way it's done, is that there is actually a parser looking for a pattern like this:

{% highlight javascript %}
System.getModule("com.vmware.library.date").addHoursToDate(date,hours);
{% endhighlight %}

Which means, that if you are doing the dynamic way of executing Actions, they won't automatically be added to a Package, when adding a Workflow or Workflow Folder, because the parser does not see this as "call of a Action".
