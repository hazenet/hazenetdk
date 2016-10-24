---
layout: post
title: Adding SSL to the Homelab - Using StartSSL Free Class 1 Certificates
uuid: d3c0f672-1004-46b3-adf8-06020daea91d
date: 2016-07-26T23:00:00+02:00
tags:
- SSL
- StartSSL
---

As can be seen in my [Homelab documentation](/homelab/2016-mid/) I use a subdomain (home.hazenet.dk) of my public domain (hazenet.dk), for the "always-on" part of my home and lab equipment.

Because of this, it is possible for me to use CA signed certificates from [StartSSL](https://www.startssl.com/Support?v=39){:target="_blank"}.  

{% include image.html img="/assets/2016/07/26/startssl.png" url="https://www.startssl.com/Support?v=39" alt-title="StartSSL" %}

StartSSL offers both paid and free certificates<!--break-->. The free certificates are only Class 1, which means that only the ownership of the domain is validated. Validation is done via a simple email check, you choose a specific email-prefix (e.g. "webmaster") during validation, and a email is sent to that email of the domain (e.g. "webmaster@hazenet.dk"), which validates that you are in control of the domain.

With the domain validated at StartSSL, you are now free to generate/request as many certificates as you like, with only a few limitations.

- Validity length is fixed to 1 year
- Maximum of 5 different domains, but unlimited certificates within these domains
- Only standard Web server certificates (SSL/TLS) and Client/Mail certificates (S/MIME) can be generated
- No wildcards
- No Subject Alternative Names
- Revocations have a handling fee of US$ 9.90

For further information about the limits and support featues of the StartSSL Free tier, see the [StartSSL Comparison](https://www.startssl.com/#ComparisonChart){:target="_blank"} and the [StartSSL Products list](https://www.startssl.com/Support?v=39){:target="_blank"}.

Eventhough there are these limitations, the service and certificates are perfectly acceptable for homelab infrastructure.

### This series of blog posts consists of the following:

* Adding SSL to the Homelab - Using StartSSL Free Class 1 Certificates
* [Adding SSL to the Homelab - Ubiquiti EdgeRouter PoE]({% post_url 2016-07-27-adding-ssl-to-the-homelab-ubiquiti-edgerouter-poe %})
* [Adding SSL to the Homelab - Ubiquiti EdgeSwitch Lite]({% post_url 2016-08-01-adding-ssl-to-the-homelab-ubiquiti-edgeswitch-lite %})