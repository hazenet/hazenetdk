---
layout: post
title: Adding SSL to the Homelab - Ubiquiti EdgeSwitch Lite
uuid: 9a817016-8912-4bc7-8953-951da720ad8a
date: 2016-08-01T22:30:00+02:00
tags:
- EdgeSwitch
- SSL
- StartSSL
- Ubiquiti
---

First thing is to generate a CSR for the [Ubiquiti EdgeSwitch Lite 24 port](https://www.ubnt.com/edgemax/edgeswitch-lite/){:target="_blank"} (firmware version 1.5.0) device, using OpenSSL on e.g. a laptop.

{% highlight text %}
openssl req -new -newkey rsa:2048 -nodes -out switch_home_hazenet_dk.csr -keyout switch_home_hazenet_dk.key -subj "/C=DK/ST=Jylland/L=Hedensted/O=Hazenet/OU=Home/CN=switch.home.hazenet.dk"
{% endhighlight %}

The options used in the command are<!--break-->:

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

The output of this command will be two files, "switch_home_hazenet_dk.csr" and "switch_home_hazenet_dk.key".

Now login to the StartSSL website and request a new Web Server certificate for your validated domain.  
Provide the content of the CSR file, when requested on the website. And also provide the URL, in this case "switch.home.hazenet.dk".  
Submit the request and StartSSL will provide a ZIP file, containing multiple versions of the newly created certificate in different formats.

For the Ubiquiti EdgeSwitch Lite use the format called "OtherServer".  
Inside the OtherServer folder there are 3 files, "1_Intermediate.crt", "2_switch.home.hazenet.dk.crt" and "root.crt".

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

Rename the file "2_switch.home.hazenet.dk.crt" to "server.pem".  
Then copy the contents of the private key file "switch_home_hazenet_dk.key" into the "server.pem" file. Then content needs to be pasted before the existing content of the "server.pem" file.

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
MIIF/TCCBOWgAwIBAgIQUHknZOKEMNFLLCkD1nt3vDANBgkqhkiG9w0BAQsFADB4
MQswCQYDVQQGEwJJTDEWMBQGA1UEChMNU3RhcnRDb20gTHRkLjEpMCcGA1UECxMg
U3RhcnRDb20gQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxJjAkBgNVBAMTHVN0YXJ0
Q29tIENsYXNzIDEgRFYgU2VydmVyIENBMB4XDTE2MDYxNDA5MzYyN1oXDTE3MDYx
NDA5MzYyN1owLjELMAkGA1UEBhMCREsxHzAdBgNVBAMMFnN3aXRjaC5ob21lLmhh
emVuZXQuZGswggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCeEKGYkf8q
SEck70kB1aZS+LsRBJzTcJilmY5qwBSFkWN2O+aUQ3/H0v7hU/l30nEySJxkUXwr
3rx//bgqMIJ4mk2LArhPt1Tx/7s8ps1mcxIv45uoecWNYu7aekar40nxa5BuF3ke
fgKXVUV31kN4r1UOF7Iesj9UHw5am/FomUO0wgHPr3JOaezzqhTNGddoYZSqWxvr
uF/qkjG6SmQyOJrBUShsPKwufDR63QH2ynWmORPp/Ifzx4m5E1LM/CGliG7rE7lH
Pf749Fr7A9l9IV05xgyuTNKbHnokETirFJc8mZgvUSA8SwjAK5T5skHhHDMk7rbw
0SJOGXYHpI8VAgMBAAGjggLLMIICxzAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYw
FAYIKwYBBQUHAwIGCCsGAQUFBwMBMAkGA1UdEwQCMAAwHQYDVR0OBBYEFMSnlSoM
vRHJGgkkH/kxSfKE3FhgMB8GA1UdIwQYMBaAFNeRTgHEsL/4yGeTRJznM/qtkwyv
MG8GCCsGAQUFBwEBBGMwYTAkBggrBgEFBQcwAYYYaHR0cDovL29jc3Auc3RhcnRz
c2wuY29tMDkGCCsGAQUFBzAChi1odHRwOi8vYWlhLnN0YXJ0c3NsLmNvbS9jZXJ0
cy9zY2Euc2VydmVyMS5jcnQwOAYDVR0fBDEwLzAtoCugKYYnaHR0cDovL2NybC5z
dGFydHNzbC5jb20vc2NhLXNlcnZlcjEuY3JsMCEGA1UdEQQaMBiCFnN3aXRjaC5o
b21lLmhhemVuZXQuZGswIwYDVR0SBBwwGoYYaHR0cDovL3d3dy5zdGFydHNzbC5j
b20vMFEGA1UdIARKMEgwCAYGZ4EMAQIBMDwGCysGAQQBgbU3AQIFMC0wKwYIKwYB
BQUHAgEWH2h0dHBzOi8vd3d3LnN0YXJ0c3NsLmNvbS9wb2xpY3kwggEDBgorBgEE
AdZ5AgQCBIH0BIHxAO8AdgBo9pj4H2SCvjqM7rkoHUz8cVFdZ5PURNEKZ6y7T0/7
xAAAAVVOV3THAAAEAwBHMEUCIGbjbPQf2ovaqDwe222ISFix3OPsBCrf8NBkw215
cP+BAiEAhL7Im7jV+dux1FGec5e3npjZz73nP9nHX174bSoMx/IAdQCkuQmQtBhY
FIe7E6LMZ3AKPDWYBPkb37jjd80OyA3cEAAAAVVOV3V1AAAEAwBGMEQCIAaIku0T
wxQWFer3X+Cvjh+cQZW0IcmSHf3AhOmp2sSGAiAvlqRSJk5osr76d4jniIPvOTlQ
raf8G2y0cOAuDb08PzANBgkqhkiG9w0BAQsFAAOCAQEAt35K/Kw2S9IV0Z/5d617
8/yOHFExJptq7z7L98q00yDBSAwXPKjCxeTn0lMWoxgYfhL7C3UIrDqAnhDu8rDJ
XCthgtTfMCqn4gUTCFw2zD8ZCDmvNvCkmT5LbfEWi82zFfOuauAtzqvIt7KqI5Q9
YGRURbrZABLuWNCbde+chKQEcE/8fVH+e57OAzh5B8Lw08BB9pPegSjTPqTDWWxc
0RC9ZzbPFYdbmRPRhFBnIyZRxTLiMVCpHY7LOZElns7GVvamc7NNediVXUEdo4we
uKrLxntA5USH3ML19L2BA8Ty8Cn50uxiEJE/7HUEqE8osPGaY3MXLFaLlUrhMtzr
Sw==
-----END CERTIFICATE-----
{% endhighlight %}
_For information the above private key is a dummy private key_

Now login to the Ubiquiti EdgeSwitch Lite switch, and go to "System -> Management Access -> HTTPS":

{% include image.html img="/assets/2016/08/01/ubiquiti-edgeswitch-lite-default-https.jpg" alt-title="ubiquiti-edgeswitch-lite-default-https.jpg" %}

If the Ubiquiti EdgeSwitch Lite is already running in "HTTPS Admin Mode", it is required to disable "HTTPS Admin Mode" before a new certificate can be uploaded.
 
**<span style="color: red;">Before disabling "HTTPS Admin Mode", do remember to enable normal "HTTP Admin Mode" for ease of access :-)</span>**

Click the small upload icon besides the box saying "Absent".  
Upload the "ca.pem" file for the "SSL Trusted Root Certificate PEM File" dropdown option.

{% include image.html img="/assets/2016/08/01/ubiquiti-edgeswitch-lite-ca-pem.jpg" alt-title="ubiquiti-edgeswitch-lite-ca-pem.jpg" %}

Upload the "server.pem" file for the "SSL Server Certificate PEM File" dropdown option.

{% include image.html img="/assets/2016/08/01/ubiquiti-edgeswitch-lite-server-pem.jpg" alt-title="ubiquiti-edgeswitch-lite-server-pem.jpg" %}

Click close, and enable "HTTPS Admin Mode".  
I would also suggest to disable "SSL Version 3", as that is generally not seen as secure anymore.  
Eventhough "TLS Version 1" is only slightly more secure than "SSL Version 3". I would have liked to have "TLS Version 1.2", which is consided the "standard" now.

{% include image.html img="/assets/2016/08/01/ubiquiti-edgeswitch-lite-configured-https.jpg" alt-title="ubiquiti-edgeswitch-lite-configured-https.jpg" %}

Submit the changes and save the configuration.

If you now load up the Ubiquiti EdgeSwitch Lite web-interface, you should now see that it uses this newly created certificate.

{% include image.html img="/assets/2016/08/01/ubiquiti-edgeswitch-lite-certificate.jpg" alt-title="ubiquiti-edgeswitch-lite-certificate.jpg" %}

After you have verified that the Certificate and HTTPS configuration is working, you can now disable normal "HTTP Admin Mode" and thereby force HTTPS only connections to the Ubiquiti EdgeSwitch Lite.

### This series of blog posts consists of the following:

* [Adding SSL to the Homelab - Using StartSSL Free Class 1 Certificates]({% post_url 2016-07-26-adding-ssl-to-the-homelab-using-startssl-free-class-1-certificates %})
* [Adding SSL to the Homelab - Ubiquiti EdgeRouter PoE]({% post_url 2016-07-27-adding-ssl-to-the-homelab-ubiquiti-edgerouter-poe %})
* Adding SSL to the Homelab - Ubiquiti EdgeSwitch Lite
