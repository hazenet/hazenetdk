---
layout: post
title: Adding SSL to the Homelab - Ubiquiti EdgeRouter PoE
uuid: 592f85a9-e511-454f-a2d4-abdd578d9345
date: 2016-07-27T23:00:00+02:00
tags:
- EdgeRouter
- SSL
- StartSSL
- Ubiquiti
---

As described in [Adding SSL to the Homelab - Using StartSSL Free Class 1 Certificates]({% post_url 2016-07-26-adding-ssl-to-the-homelab-using-startssl-free-class-1-certificates %}), I am going to use certifactes from StartSSL to secure my Ubiquiti EdgeRouter PoE.

Let's start by generating a CSR for my [Ubiquiti EdgeRouter PoE](https://www.ubnt.com/edgemax/edgerouter-poe/){:target="_blank"} (firmware version 1.8.5) device, using OpenSSL on e.g. a laptop<!--break-->.

{% highlight text %}
openssl req -new -newkey rsa:2048 -nodes -out edge_home_hazenet_dk.csr -keyout edge_home_hazenet_dk.key -subj "/C=DK/ST=Jylland/L=Hedensted/O=Hazenet/OU=Home/CN=edge.home.hazenet.dk"
{% endhighlight %}

The options used in the command are:

- req = We are working with a request
- new = Generate a new request
- newkey rsa:2048 = Generate a new private key, with type of RSA and 2048 bit length
- nodes = Don't encrypt the new private key. (Not the word "nodes", but actual "No DES")
- out _path_ = Where to store the CSR output
- keyout _path_ = Where to store the new private key
- subj = Subject name and content of the request
	- C = Country
	- ST = State
	- L = Location/City
	- O = Organization
	- OU = Organizational Unit
	- CN = Common Name (the actual URL)

The output of this command will be two files, "edge_home_hazenet_dk.csr" and "edge_home_hazenet_dk.key".

Now login to the StartSSL website and request a new Web Server certificate for your validated domain.  
Provide the content of the CSR file, when requested on the website. And also provide the URL, in this case "edge.home.hazenet.dk".  
Submit the request and StartSSL will provide a ZIP file, containing multiple versions of the newly created certificate in different formats.

For the Ubiquiti EdgeRouter PoE use the format called "OtherServer".  
Inside the OtherServer folder there are 3 files, "1_Intermediate.crt", "2_edge.home.hazenet.dk.crt" and "root.crt".

Rename the file "1_Intermediate.crt" to "ca.pem". Copy content of "root.crt" below the existing content of "ca.pem", so it now looks like this:

{% highlight text %}
-----BEGIN CERTIFICATE-----
MIIF5TCCA82gAwIBAgIQal3D5TtOT9B7aR6l/OxkazANBgkqhkiG9w0BAQsFADB9
MQswCQYDVQQGEwJJTDEWMBQGA1UEChMNU3RhcnRDb20gTHRkLjErMCkGA1UECxMi
U2VjdXJlIERpZ2l0YWwgQ2VydGlmaWNhdGUgU2lnbmluZzEpMCcGA1UEAxMgU3Rh
cnRDb20gQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkwHhcNMTUxMjE2MDEwMDA1WhcN
MzAxMjE2MDEwMDA1WjB4MQswCQYDVQQGEwJJTDEWMBQGA1UEChMNU3RhcnRDb20g
THRkLjEpMCcGA1UECxMgU3RhcnRDb20gQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkx
JjAkBgNVBAMTHVN0YXJ0Q29tIENsYXNzIDEgRFYgU2VydmVyIENBMIIBIjANBgkq
hkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2uz0qohni7BLYmaWv8lEaObCK0ygM86s
eeN2w9FW4HWvQbQKRYDvy43kFuMmFD4RHkHn1Mk7sijXkJ/F8NH+5Tjbins7tFIC
ZXd+Qe2ODCMcWbOLoYB54sM514tsZk6m3M4lZi3gmT7ISFiNdKpf/C3dZwasWea+
dbLpwQWZEcM6oCXmW/6L3kwQAhC0GhJm2rBVrYEDvZq1EK3Bv+g5gAW8DVfusUai
oyW0wfQdnKtOLv1M4rtezrKtE8T5tjyeKvFqMX93+LYVlT8Vs+sD12s3ncldqEDL
U89IiBjg6FsbLfM2Ket/3RbfvggfQMPQshipdhrZL8q10jibTlViGQIDAQABo4IB
ZDCCAWAwDgYDVR0PAQH/BAQDAgEGMB0GA1UdJQQWMBQGCCsGAQUFBwMCBggrBgEF
BQcDATASBgNVHRMBAf8ECDAGAQH/AgEAMDIGA1UdHwQrMCkwJ6AloCOGIWh0dHA6
Ly9jcmwuc3RhcnRzc2wuY29tL3Nmc2NhLmNybDBmBggrBgEFBQcBAQRaMFgwJAYI
KwYBBQUHMAGGGGh0dHA6Ly9vY3NwLnN0YXJ0c3NsLmNvbTAwBggrBgEFBQcwAoYk
aHR0cDovL2FpYS5zdGFydHNzbC5jb20vY2VydHMvY2EuY3J0MB0GA1UdDgQWBBTX
kU4BxLC/+Mhnk0Sc5zP6rZMMrzAfBgNVHSMEGDAWgBROC+8apEBbpRdphzDKNGhD
0EGu8jA/BgNVHSAEODA2MDQGBFUdIAAwLDAqBggrBgEFBQcCARYeaHR0cDovL3d3
dy5zdGFydHNzbC5jb20vcG9saWN5MA0GCSqGSIb3DQEBCwUAA4ICAQCO5z+95Eu6
gog9K9e7DatQXfeUL8zq1Ycj0HKo3ZvFhRjULAVrMj7JrURtfoZziTDl39gvMDhL
voN5EFEYQWyre5ySsFgGeZQHIC0zhETILSyAE7JCKaEJ//APnkcQfx458GOuJvi+
p2JpRxa8Sc/HVJ9HqA687QbbJFFZlUP5IqLtCb8yZVBURd4Nm/+01DXBzomoQPwA
K3cYl9br6Q+eKmCKPKN6X4IT1gwtwXuca1f3OpZTbUFPdPz1KvP1qCFt+rNieSmO
BN76Xa9ffzoBByzVdnvk2OHuopmJq/eHF+E3s+GFYT6Oxjrez/lEbBvgEmGyXZOZ
aj6XeDnBxOIYRODfnZG99cy2q5WtDLHKuiMogJGO89PWaI2jK1Aq5sa0j55jp2Je
FXbRieKw5CKreCIiNR9MpaffieLgbTcK1BSKjxUZtd7BqJ3x1lvD2jbe7WKqzusZ
btPhFgrDDsgdw27zQokNYBZZaa1LwYZGZgddiAcLcYkilGobA2wLKk6eYz6VnatD
dI4aQx6FkHWvKU0e7s/cUym6Px3vXrC4z6woAztC98XaorPO0pkL73P4dKSjnKYY
rYsqe7BnBGtANf1XaG5Pm8BUWJ9WZAWin6KsJXTo8Nj0G4CRq7dq17LBnCbi9Qmp
Szc2kuPNbrV8PvbTLIXupfZFFj0d9mpaFg==
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIHyTCCBbGgAwIBAgIBATANBgkqhkiG9w0BAQUFADB9MQswCQYDVQQGEwJJTDEW
MBQGA1UEChMNU3RhcnRDb20gTHRkLjErMCkGA1UECxMiU2VjdXJlIERpZ2l0YWwg
Q2VydGlmaWNhdGUgU2lnbmluZzEpMCcGA1UEAxMgU3RhcnRDb20gQ2VydGlmaWNh
dGlvbiBBdXRob3JpdHkwHhcNMDYwOTE3MTk0NjM2WhcNMzYwOTE3MTk0NjM2WjB9
MQswCQYDVQQGEwJJTDEWMBQGA1UEChMNU3RhcnRDb20gTHRkLjErMCkGA1UECxMi
U2VjdXJlIERpZ2l0YWwgQ2VydGlmaWNhdGUgU2lnbmluZzEpMCcGA1UEAxMgU3Rh
cnRDb20gQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkwggIiMA0GCSqGSIb3DQEBAQUA
A4ICDwAwggIKAoICAQDBiNsJvGxGfHiflXu1M5DycmLWwTYgIiRezul38kMKogZk
pMyONvg45iPwbm2xPN1yo4UcodM9tDMr0y+v/uqwQVlntsQGfQqedIXWeUyAN3rf
OQVSWff0G0ZDpNKFhdLDcfN1YjS6LIp/Ho/u7TTQEceWzVI9ujPW3U3eCztKS5/C
Ji/6tRYccjV3yjxd5srhJosaNnZcAdt0FCX+7bWgiA/deMotHweXMAEtcnn6RtYT
Kqi5pquDSR3l8u/d5AGOGAqPY1MWhWKpDhk6zLVmpsJrdAfkK+F2PrRt2PZE4XNi
HzvEvqBTViVsUQn3qqvKv3b9bZvzndu/PWa8DFaqr5hIlTpL36dYUNk4dalb6kMM
Av+Z6+hsTXBbKWWc3apdzK8BMewM69KN6Oqce+Zu9ydmDBpI125C4z/eIT574Q1w
+2OqqGwaVLRcJXrJosmLFqa7LH4XXgVNWG4SHQHuEhANxjJ/GP/89PrNbpHoNkm+
Gkhpi8KWTRoSsmkXwQqQ1vp5Iki/untp+HDH+no32NgN0nZPV/+Qt+OR0t3vwmC3
Zzrd/qqc8NSLf3Iizsafl7b4r4qgEKjZ+xjGtrVcUjyJthkqcwEKDwOzEmDyei+B
26Nu/yYwl/WL3YlXtq09s68rxbd2AvCl1iuahhQqcvbjM4xdCUsT37uMdBNSSwID
AQABo4ICUjCCAk4wDAYDVR0TBAUwAwEB/zALBgNVHQ8EBAMCAa4wHQYDVR0OBBYE
FE4L7xqkQFulF2mHMMo0aEPQQa7yMGQGA1UdHwRdMFswLKAqoCiGJmh0dHA6Ly9j
ZXJ0LnN0YXJ0Y29tLm9yZy9zZnNjYS1jcmwuY3JsMCugKaAnhiVodHRwOi8vY3Js
LnN0YXJ0Y29tLm9yZy9zZnNjYS1jcmwuY3JsMIIBXQYDVR0gBIIBVDCCAVAwggFM
BgsrBgEEAYG1NwEBATCCATswLwYIKwYBBQUHAgEWI2h0dHA6Ly9jZXJ0LnN0YXJ0
Y29tLm9yZy9wb2xpY3kucGRmMDUGCCsGAQUFBwIBFilodHRwOi8vY2VydC5zdGFy
dGNvbS5vcmcvaW50ZXJtZWRpYXRlLnBkZjCB0AYIKwYBBQUHAgIwgcMwJxYgU3Rh
cnQgQ29tbWVyY2lhbCAoU3RhcnRDb20pIEx0ZC4wAwIBARqBl0xpbWl0ZWQgTGlh
YmlsaXR5LCByZWFkIHRoZSBzZWN0aW9uICpMZWdhbCBMaW1pdGF0aW9ucyogb2Yg
dGhlIFN0YXJ0Q29tIENlcnRpZmljYXRpb24gQXV0aG9yaXR5IFBvbGljeSBhdmFp
bGFibGUgYXQgaHR0cDovL2NlcnQuc3RhcnRjb20ub3JnL3BvbGljeS5wZGYwEQYJ
YIZIAYb4QgEBBAQDAgAHMDgGCWCGSAGG+EIBDQQrFilTdGFydENvbSBGcmVlIFNT
TCBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTANBgkqhkiG9w0BAQUFAAOCAgEAFmyZ
9GYMNPXQhV59CuzaEE44HF7fpiUFS5Eyweg78T3dRAlbB0mKKctmArexmvclmAk8
jhvh3TaHK0u7aNM5Zj2gJsfyOZEdUauCe37Vzlrk4gNXcGmXCPleWKYK34wGmkUW
FjgKXlf2Ysd6AgXmvB618p70qSmD+LIU424oh0TDkBreOKk8rENNZEXO3SipXPJz
ewT4F+irsfMuXGRuczE6Eri8sxHkfY+BUZo7jYn0TZNmezwD7dOaHZrzZVD1oNB1
ny+v8OqCQ5j4aZyJecRDjkZy42Q2Eq/3JR44iZB3fsNrarnDy0RLrHiQi+fHLB5L
EUTINFInzQpdn4XBidUaePKVEFMy3YCEZnXZtWgo+2EuvoSoOMCZEoalHmdkrQYu
L6lwhceWD3yJZfWOQ1QOq92lgDmUYMA0yZZwLKMS9R9Ie70cfmu3nZD0Ijuu+Pwq
yvqCUqDvr0tVk+vBtfAii6w0TiYiBKGHLHVKt+V9E9e4DGTANtLJL4YSjCMJwRuC
O3NJo2pXh5Tl1njFmUNj403gdy3hZZlyaQQaRwnmDwFWJPsfvw55qVguucQJAX6V
um0ABj6y6koQOdjQK/W/7HW/lwLFCRsI3FU34oH7N4RDYiDK51ZLZer+bMEkkySh
NOsF/5oirpt9P/FlUQqmMGqz9IgcgA38corog14=
-----END CERTIFICATE-----
{% endhighlight %}

Rename the file "2_edge.home.hazenet.dk.crt" to "server.pem".  
Then copy the contents of the private key file "edge_home_hazenet_dk.key" into the "server.pem" file. Then content needs to be pasted before the existing content of the "server.pem" file.

The structure of "server.pem" file should now look like this:

_For information the below private key is a dummy private key_
{% highlight text %}
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA8b/6xDmgE5h8szd0NH60Aq5RNnfE6pYP0QFWPsPJl93rseMi
eWagOop0W+TnmmhC2cePjjS1PBTmB5gmyRz7pDf5HXE5P3sD59hbPLixKRkG0bKf
sLebPShl/DinmoALswDwNtc1OqwTsYuq1k6t95UIQ/hWRgnATWI605cg5e6o9Y44
ANoeO2G3kAtoYP382xePn4kKN1XICwirXJI6VXB5I4JZ2XouxzghA/8sAvT5bWJZ
apf9uO4CXBKXofG+FY+xghkv3GGagqB/QZecSCjPRdVqb8R2JCDNO4xqHJlsHF33
G13pCB6ByqdbG1Lp+6qw3RmSK3du125xo3924wIDAQABAoIBAQCZg9DpZLKLXwzo
/bD0WPVUsn9t+DZ6xVo73f53kvrkTo+KgfL1Zr8fDacAZ+bO/aBeDUTTCBOCmL7O
WcdfdOEzkjvGf4zcC/EZ/CFL+Pi/YV4cMbMIlD+nYY0J0qxUBzXmsRTZrmXl4ToM
R+Xvez0r+F6sUvnuNekA+vziOpkwiNaU0AvcZeVRIQVZcyUPwaulaGt5JlMDCHMI
YA/TLxo5jiugBZxytKEDd5eAp9IJsyqHbaLMVBkRXY2BTCFIQ12rlt0PsnLP/dL1
PNgR6raUCbFdsUTwObPjd5jb7RfqBOM+JKKkNpCra/DdpbhkxVqzFbovgXBPRgmc
7JCuUcHhAoGBAPwcyBVoDE2RbfxbXrZAtBJjU4n6RTuWQjMt6U+3l5dOgPRIxLhF
XAh25GVq9VIp2b9OCbhbsOJoW09bLOk0/JeRS5AyxD0MdD39UHpRoMyupz/TbZnt
6D3jj0Z4KwaV0yhCsuBZoisS4VLSAVPYdZIbo2NzMwstE5FBe3RgKuiTAoGBAPV6
SrLICQ9xuH2yGONxJLwZPnJUd+bba0ZE7oovFUNv/3ly3i5eSws3cPOqafxidUyy
INdf7C9tPyo5MLY0Ys+H7EKu/oTlwrCfE1jID86RV3O1Sox4cds5fc80SEL16v/K
rzYsLLyPyyqxRvWSteErjuBIDVGaFypRVHjOnLpxAoGASzXO3sv2d6F9/T3IyHgP
ADlPb6cQxlDyGNCGfLiZaZMK11VqEkrmxMOrKTI6UzOW+QIv1ibMYw6cxtS9Vijv
fcvjjfYHIus3NlL+ki8N2GH2FQ1e8f/OO8BKOsyYkVNa9fTH5jP3NABi5dEugjPe
ByNln8J7JMdiwf+V88bIpi8CgYEAr4vz7WRV7mCB8gmx+LzJ62YWHUbAtCxHy+mx
uMow55gpV53Iu9ocynmsYeSFhMKYZe+gwsTLL6Ntn3Fkn3hZDVaDo7BnPXzdvNcV
y9DOVQflRU7pcAkWSxMTIGGgJ5qboq88m339xB8EyJQcTbPMM6mltEhyld+fH1ko
EniW5lECgYAG4ePQoMcpONGcuJN9wxzs2Wy/Zo8pnsgONfJeaVQIITb6B7GuRnf2
ptuMeoQ0emWuoyqMNwE3eSIeAmScbCO04YaE6EuuOQ7kK5pWFZMuNJGMOho2Ysoo
Zz1iqqzS77/ggdTnaOis24eP/q6ftf6KlsAs9ZxdT8IUck+S2uA+6Q==
-----END RSA PRIVATE KEY-----
-----BEGIN CERTIFICATE-----
MIIF+DCCBOCgAwIBAgIQRAdd7qze+tw3W0JFzU66QTANBgkqhkiG9w0BAQsFADB4
MQswCQYDVQQGEwJJTDEWMBQGA1UEChMNU3RhcnRDb20gTHRkLjEpMCcGA1UECxMg
U3RhcnRDb20gQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxJjAkBgNVBAMTHVN0YXJ0
Q29tIENsYXNzIDEgRFYgU2VydmVyIENBMB4XDTE2MDYxNDA4MTEzMloXDTE3MDYx
NDA4MTEzMlowLDELMAkGA1UEBhMCREsxHTAbBgNVBAMMFGVkZ2UuaG9tZS5oYXpl
bmV0LmRrMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoqVz/OY4EmAU
f3TrT6WD4tjFYRs2LZ5PWpMBwAD2Z+JqhYg8+n4ABv/JlLWnF3PlNLXioJOEIXPD
F6T4TNd3UcdLLvWulW5hDgxTQLDPZQNIvZsFobF8KHg8k7hst0wfMoXmMgQk4jkr
WzwyqVG0e4ZAYLdrKF2nu1eqZ+NkbeHiBw7sGZ7vSXw+SUgiyy/D9ackOWnMQrnn
Ix5LSC9MxmtbqKQCUKA/xnriCHJG+SsFp+5204MTTTakfpm7mnMSyI2CHmHrWBQC
s/7wMPuxMz9KDn+5G5hZRSB+o66r9OBTvbSqUfEj8KsdWNSOoFWdfG4h3sRmgRxe
CU+MlVkc8QIDAQABo4ICyDCCAsQwDgYDVR0PAQH/BAQDAgWgMB0GA1UdJQQWMBQG
CCsGAQUFBwMCBggrBgEFBQcDATAJBgNVHRMEAjAAMB0GA1UdDgQWBBTk1MfcSQdO
9zD6boUSw8K+QjzqRjAfBgNVHSMEGDAWgBTXkU4BxLC/+Mhnk0Sc5zP6rZMMrzBv
BggrBgEFBQcBAQRjMGEwJAYIKwYBBQUHMAGGGGh0dHA6Ly9vY3NwLnN0YXJ0c3Ns
LmNvbTA5BggrBgEFBQcwAoYtaHR0cDovL2FpYS5zdGFydHNzbC5jb20vY2VydHMv
c2NhLnNlcnZlcjEuY3J0MDgGA1UdHwQxMC8wLaAroCmGJ2h0dHA6Ly9jcmwuc3Rh
cnRzc2wuY29tL3NjYS1zZXJ2ZXIxLmNybDAfBgNVHREEGDAWghRlZGdlLmhvbWUu
aGF6ZW5ldC5kazAjBgNVHRIEHDAahhhodHRwOi8vd3d3LnN0YXJ0c3NsLmNvbS8w
UQYDVR0gBEowSDAIBgZngQwBAgEwPAYLKwYBBAGBtTcBAgUwLTArBggrBgEFBQcC
ARYfaHR0cHM6Ly93d3cuc3RhcnRzc2wuY29tL3BvbGljeTCCAQIGCisGAQQB1nkC
BAIEgfMEgfAA7gB1AKS5CZC0GFgUh7sTosxncAo8NZgE+RvfuON3zQ7IDdwQAAAB
VU4R4MoAAAQDAEYwRAIgQqh2ZAKTLf+z2UgMUodAyoY2srVCr4dyuH/bPCOgZdAC
IF8oDEdiGFXD8IJ4l95OC0oRSNfXI0KxZBt1IMaDCHQeAHUAaPaY+B9kgr46jO65
KB1M/HFRXWeT1ETRCmesu09P+8QAAAFVThHhrQAABAMARjBEAiAHw/Y5/9yw05iK
S+xaF7GCAUaltrtRSTQmvncjQpVwjQIgHQOtKr6m68nMo1xJreszR/Sho4FM1pkv
UbEe5K86BCgwDQYJKoZIhvcNAQELBQADggEBAIK6jM+OJ56COWnYdDO32BtvtVek
UxEhFHIM+c+0B4vo/Zp1c16CkinG1ldXsJz4QzeAWW1AmnXP0ajDRhywbsnrgAVz
EI7ED56bM9OIsfK0AceUySni3BfmhaFcb53u3XFAFw3Gyxu/bJIJsqMZpP80LG+2
t4W1vmyJ0+d/uGuoysEskY1hMR42TqdnJu6MVMOQy9DWM471Agvo9QTV/TuCh/Ph
XYaIgBdATne1LTGbjx9pQODPB/sLVRieCJepci5DMGQdJDvxv57x2yUTiodnQtM5
kgPCiiE6PkY/1P6DISp5JeknfaPHbaO/+eyRUPlFU8fTMab7ZLLQkE5N4GY=
-----END CERTIFICATE-----
{% endhighlight %}
_For information the above private key is a dummy private key_

Now SCP the two files, "server.pem" and "ca.pem" to the Ubiquiti EdgeRouter PoE, into the "/config/auth/" folder.

SSH into the Ubiquiti EdgeRouter PoE and change the ownership and permissions on the newly uploaded files:

{% highlight text %}
sudo chown root:root /config/auth/*.pem
sudo chmod 400 /config/auth/*.pem
{% endhighlight %}

Now we just need to configure the Ubiquiti EdgeRouter PoE to actually use the new certificate files.  
While still in the SSH session run the following commands:

{% highlight text %}
configure
set service gui cert-file /config/auth/server.pem
set service gui ca-file /config/auth/ca.pem
commit
save
{% endhighlight %}

If you now load up the Ubiquiti EdgeRouter PoE web-interface, you should now see that it uses this newly created certificate.

{% include image.html img="/assets/2016/07/27/ubiquiti-edgerouter-poe-certificate.jpg" alt-title="ubiquiti-edgerouter-poe-certificate.jpg" %}

### This series of blog posts consists of the following:

* [Adding SSL to the Homelab - Using StartSSL Free Class 1 Certificates]({% post_url 2016-07-26-adding-ssl-to-the-homelab-using-startssl-free-class-1-certificates %})
* Adding SSL to the Homelab - Ubiquiti EdgeRouter PoE
* [Adding SSL to the Homelab - Ubiquiti EdgeSwitch Lite]({% post_url 2016-08-01-adding-ssl-to-the-homelab-ubiquiti-edgeswitch-lite %})