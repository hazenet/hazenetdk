---
layout: post
title: Getting started with Automation and Orchestration
uuid: 01805bf3-bcc7-4c0b-acb4-86be0c2fc78c
date: 2017-06-26T09:20:00+02:00
tags:
- Automation
- Orchestration
---

A lot of IT people are looking at automation and orchestration as a way to do more with less. Or to be able to deliver what the business needs faster. But many forget one of the biggest benefits of having automated a process, and that is that the process needs to be standardised first, for the automation project to be successful. Automation through standardisation brings consistency and easier operations of the items being automated.

Many businesses that get started with automation have a tendency to want to automate everything in one big project<!--break-->. That is almost always bound to fail. Even if we just look at something like automating the deployment of all new servers, it would probably still fail. There are simply too many variables, routes and scenarios to handle, when considering that the organisation doesn’t have a lot of automation experience.

For the automation project to succeed, it is wise to start small, gain some experience and build upon what the people and business have learned. Select a process that is frequently repeated in a very similar fashion, a process that is very prone to human errors or maybe a process that is rarely done, but involves a lot of error-prone steps.

Below, I outline a list with 6 steps that are very relevant for a good automation project.

1. __Process__  
The very first step in any automation project should be understanding the process that needs to be automated. Knowing exactly how it is done manually today will bring you a lot of insight. If the project spans multiple teams or departments, then get stakeholders from each team involved in this phase.  
Write down and document the current process, and thereby produce a pipeline that describes how the item moves forward. From the raw input to the finished product or item.  
If we are talking about the deployment of a new server, remember the whole process, not just the part that the virtualisation team normally does.  
Also consider the service desk people receiving the original request, the backup team, the networking team, the application team, the operations team and the security team.  
Are they included in your pipeline? And what about the decommissioning of the requested item, is that part of the process included in the pipeline? The pipeline should optimally also include the different failure scenarios the item may experience in the pipeline, to ensure rerouting for making the required cleanup.
 
2. __Standardise__  
When you have learned the item moves through the different teams, departments and tasks, it is time to standardise all the decisions and routes the item can possibly encounter.  
In the case of the deployment of a new server, the decisions may be which network it should get attached to, which storage it should be located on, which compute cluster should host it or which datacenter it needs to be deployed into.  
Optimally all decision criteria can optimally be based on the raw input and some business logic. The number of tasks in the pipeline that require human interaction should be minimised.
 
3. __Optimise__  
Once you have figured out all the raw inputs needed for the item to move all the way through the pipeline, and all the different business logic required to route the item correctly, you should take a good look at the pipeline and try to optimise it.  
Remove unnecessary tasks and perhaps move tasks to avoid reverse flow: situations where the item moves backwards through the teams or departments.
 
4. __Automate__  
At this point, break down the pipeline into its individual tasks, and begin to automate each of these.  
From the standardisation and optimisation, it should be clear which inputs are required for each task and what the expected output are.  
How the individual tasks are automated is not critical, as long as they can be executed programmatically. Just try to minimise the number of tools used to automate the whole pipeline, which helps reduce operational complexity of the project in the future.
 
5. __Orchestrate__  
In this step, all the automated tasks are bound together to form the functional pipeline. There are multiple engines available that can facilitate orchestration.  
But there are some obvious requirements; it needs to integrate with all the different tools used in the automation of each task and the general infrastructure.  
It may also need to have a user friendly front-end, enabling end-users to request items and perform actions, without requiring involvement from the personnel in IT.  
Whenever an item is requested the orchestration engine needs to validate all inputs, to minimise errors further down the pipeline. The earlier an issue is caught in the pipeline, the less resources are wasted and the less cleanup needs to be done.
 
6. __Document__  
It is very important to fully document the project. This includes the tools being used, where they are located, how to access them and a visual overview of the pipeline for easy understanding of the process.  
The individually automated tasks in the whole pipeline should be self-documenting, when possible. Meaning that the script or workflow automating a specific task should be easily readable for people who have not been involved while making it.  
When producing any form of code, don’t try to make it as smart and short as possible, but instead make it as readable and understandable as possible. You never know who the next person to work on this might be.
 
Following these six steps, you can significantly raise the likelihood of success for the automation project when compared with just diving into coding some scripts and workflows for automating whatever you currently know.

Getting back to the deployment of new servers in a business, if the process is correctly automated, it is very easy to scale and it will be much easier to repeat the deployment elsewhere.  
That could be on a public cloud or perhaps the [Proact Hybrid Cloud](http://www.proact.eu/managed_cloud_services/Proact-Hybrid-Cloud/){:target="_blank"}, which is my employers Infrastructure as a Service offering.

*<span style="color: red;">Originally posted as part of a marketing campaign for Proact</span>*
