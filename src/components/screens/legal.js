import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native'

import NavigationBar from 'react-native-navbar'
import BackArrow from '../commons/backButtonNavItem'

class Legal extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={{
            title: 'Terms and Privacy',
            tintColor: '#ff0055'
          }}
          leftButton={<BackArrow onPress={() => this.props.navigator.pop()}/>}
          />
          <ScrollView style={styles.wrapper}>
          <Text style={styles.header}>Terms of Service</Text>
            <Text>
            Terms of Service


Welcome!

We're hyped you've decided to use our products and services, all of which we refer to simply as the "Services." We've drafted these Terms of Service (which we simply call the "Terms") so that you'll know the rules that govern our relationship with you. Although we have tried our best to strip the legalese from the Terms, there are places where these Terms may still read like a traditional contract. There's a good reason for that: These Terms do indeed form a legally binding contract between you and Party On,AS. So please read them carefully. By using the Services, you agree to the Terms. Of course, if you don't agree with them, then don't use the Services.

1. Who Can Use the Services

No one under 18 is allowed to create an account or use the Services,please read all terms carefully. By using the Services, you state that:

•	You can form a binding contract with Party On;

•	You are not a person who is barred from receiving the Services under the laws of Norway,the United States or any other applicable jurisdiction–meaning that you do not appear on the U.S. Treasury Department's list of Specially Designated Nationals or face any other similar prohibition; and
•	You will comply with these Terms and all applicable local, state, national, and international laws, rules, and regulations.

If you are using the Services on behalf of a business or some other entity, you state that you are authorized to grant all licenses set forth in these Terms and to agree to these Terms on behalf of the business or entity.


2. Registration

To use Party On, you must register an account your Facebook login to authorize us to access, collect, store, and in general use certain information in your Facebook account, including information about Facebook friends you want to add to your group and hence share with other Party On´s users. By allowing us to access your Facebook account, you expressly acknowledge and agree that we may obtain and share your name and a profile picture, as well as the first name and profile picture of the Facebook friends you choose to add. Please take precautions to protect your password.


3. Rights We Grant You

Party On grants you a personal, worldwide, royalty-free, non-assignable, nonexclusive, revocable, and non-sublicensable license to access and use the Services. This license is for the sole purpose of letting you use and enjoy the Service's benefits in a way that these Terms and our usage policies, allow. Any software that we provide you may automatically download and install upgrades, updates, or other new features. You may be able to adjust these automatic downloads through your device's settings. You may not copy, modify, distribute, sell, or lease any part of our Services, nor may you reverse engineer or attempt to extract the source code of that software, unless applicable laws prohibit these restrictions or you have our written permission to do so.


4. Rights You Grant Us

Many of our Services let you create, upload, post, send, receive, and store content. When you do that, you retain whatever ownership rights in that content you had to begin with. But you grant us a license to use that content. How broad that license is depends on which Services you use and the Settings you have selected. For all Services other than Live, Local, and any other crowd-sourced Service, you grant Party On a worldwide, royalty-free, sublicensable, and transferable license to host, store, use, display, reproduce, modify, adapt, edit, publish, and distribute that content. This license is for the limited purpose of operating, developing, providing, promoting, and improving the Services and researching and developing new ones. Because Live, Local, and any other crowd-sourced Services are inherently public and chronicle matters of public interest, the license you grant us for content submitted to those Services is broader. In addition to the rights you grant us in connection with other Services, you also grant us a perpetual license to create derivative works from, promote, exhibit, broadcast, syndicate, publicly perform, and publicly display content submitted to Live, Local, or any other crowd-sourced Services in any form and in any and all media or distribution methods (now known or later developed). To the extent it's necessary, you also grant Party On and our business partners the unrestricted, worldwide, perpetual right and license to use your name, likeness, and voice solely in Live, Local, or other crowd-sourced content that you appear in, create, upload, post, or send. This means, among other things, that you will not be entitled to any compensation from Party On or our business partners if your name, likeness, or voice is conveyed through Live, Local, or other crowd-sourced Services. For more information about how to tailor who can watch your content, please take a look at our privacy policy. While we're not required to do so, we may access, review, screen, and delete your content at any time and for any reason, including if we think your content violates these Terms. You alone though remain responsible for the content you create, upload, post, send, or store through the Service. The Services may contain advertisements. In consideration for Party On letting you access and use the Services, you agree that Party On, its affiliates, and third-party partners may place advertising on the Services. We always love to hear from our users. But if you volunteer feedback or suggestions, just know that we can use your ideas without compensating you.


5. The Content of Others

Much of the content on our Services is produced by users, publishers, and other third parties. Whether that content is posted publicly or sent privately, the content is the sole responsibility of the person or organization that submitted it. Although Party On reserves the right to review all content that appears on the Services and to remove any content that violates these Terms, we do not necessarily review all of it. So we cannot—and do not—take responsibility for any content that others provide through the Services. Through these Terms, we make clear that we do not want the Services put to bad uses. But because we do not review all content, we cannot guarantee that content on the Services will always conform to our Terms.


6. Privacy

Your privacy matters to us. You can learn how we handle your information when you use our Services by reading our privacy policy. We encourage you to give the privacy policy a careful look because, by using our Services, you agree that Party on can collect, use, and transfer your information consistent with that policy.


7. Respecting Other People's Rights

Party On respects the rights of others. And so should you. You therefore may not upload, post, send, or store content that:


•	violates or infringes someone else's rights of publicity, privacy, copyright, trademark, or other intellectual-property right;
•	bullies, harasses, or intimidates;
•	defames; or
•	spams or solicits Party On's users. You must also respect Party On´s rights. These Terms do not grant you any right to:
•	use branding, logos, designs, photographs, videos, or any other materials used in our Services;
•	copy, archive, download, upload, distribute, syndicate, broadcast, perform, display, make available, or otherwise use any portion of the Services or the content on the Services except as set forth in these Terms;
•	use the Services or any content on the Services for any commercial purposes without our consent. In short: You may not use the Services or the content on the Services in ways that are not authorized by these Terms. Nor may you help or enable anyone else in doing so.


8. Respecting Copyright

Party On honors the requirements set forth in the Digital Millennium Copyright Act. We therefore take reasonable steps to expeditiously remove from our Services any infringing material that we become aware of. And if Party On becomes aware that one of its users has repeatedly infringed copyrights, we will take reasonable steps within our power to terminate the user's account. We make it easy for you to report suspected copyright infringement. If you believe that anything on the Services infringes a copyright that you own or control, please send us an e-mail.

Party On,AS
email: copyright@partyon.no


If you mail us the notice must:

•	contain the physical or electronic signature of a person authorized to act on behalf of the copyright owner;
•	identify the copyrighted work claimed to have been infringed;
•	identify the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed, or access to which is to be disabled, and information reasonably sufficient to let us locate the material;
•	provide your contact information, including your address, telephone number, and an email address;
•	provide a personal statement that you have a good-faith belief that the use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law; and
•	provide a statement that the information in the notification is accurate and, under penalty of perjury, that you are authorized to act on behalf of the copyright owner.




9. Safety

We try hard to keep our Services a safe place for all users. But we can't guarantee it. That's where you come in. By using the Services, you agree that:
•	You will not use the Services for any purpose that is illegal or prohibited in these Terms.
•	You will not use any robot, spider, crawler, scraper, or other automated means or interface to access the Services or extract other user's information.
•	You will not use or develop any third-party applications that interact with the Services or other users' content or information without our written consent.
•	You will not use the Services in a way that could interfere with, disrupt, negatively affect, or inhibit other users from fully enjoying the Services, or that could damage, disable, overburden, or impair the functioning of the Services.
•	You will not use or attempt to use another user's account, username, or password without their permission.
•	You will not solicit login credentials from another user.
•	You will not post content that contains pornography, graphic violence, threats, hate speech, or incitements to violence.
•	You will not upload viruses or other malicious code or otherwise compromise the security of the Services.
•	You will not attempt to circumvent any content-filtering techniques we employ, or attempt to access areas or features of the Services that you are not authorized to access.
•	You will not probe, scan, or test the vulnerability of our Services or any system or network.
•	You will not encourage or promote any activity that violates these Terms. We also care about your safety while using our Services. So do not use our Services in a way that would distract you from obeying traffic or safety laws. And never put yourself or others in harm's way just to find or make a party, capture a picture or write a text. 10. Your Account You are responsible for any activity that occurs in your account. So it's important that you keep your account secure. One way to do that is to select a strong password that you don't use for any other account. By using the Services, you agree that, in addition to exercising common sense:
•	You will not create more than one account for yourself.
•	You will not create another account if we have already disabled your account, unless you have our written permission to do so.
•	You will not buy, sell, rent, or lease access to your Party On account, a Party On username, or a friend link without our written permission.
•	You will not share your password.
•	You will not log in or attempt to access the Services through unauthorized third-party applications or clients. If you think that someone has gained access to your account, please immediately reach out to help@partyon.no


11. Data Charges and Mobile Phones

You are responsible for any mobile charges that you may incur for using our Services, including text-messaging and data charges. If you're unsure what those charges may be, you should ask your service provider before using the Services.


12. Third-Party Services

If you use a service, feature, or functionality that is operated by a third party and made available through our Services (including Services we jointly offer with the third party), each party's terms will govern the respective party's relationship with you. Party On is not responsible or liable for those third party's terms or actions taken under the third party's terms.


13. Modifying the Services and Termination We're relentlessly improving our Services and creating new ones all the time. That means we may add or remove features, products, or functionalities, and we may also suspend or stop the Services altogether. We may take any of these actions at any time, and when we do, we may not provide you with any notice beforehand. While we hope you remain a life long Party on user, you can terminate these Terms at any time and for any reason by deleting your account. Party On may also terminate these Terms with you at any time, for any reason, and without advanced notice. That means that we may stop providing you with any Services, or impose new or additional limits on your ability to use the Services. For example, we may deactivate your account due to prolonged inactivity, and we may reclaim your username at any time for any reason. Regardless of who terminates these Terms, both you and Party On continue to be bound by Sections 3, 6, 10, 13-22 of the Terms.


14. Indemnity

You agree, to the extent permitted under applicable law, to indemnify, defend, and hold harmless Party On, our directors, officers, employees, and affiliates from and against any and all complaints, charges, claims, damages, losses, costs, liabilities, and expenses (including attorneys' fees) due to, arising out of, or relating in any way to: (a) your access to or use of the Services; (b) your content; and (c) your breach of these Terms.


15. Disclaimers

We try to keep the Services up and running and free of annoyances. But we make no promises that we will succeed. THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" AND TO THE EXTENT PERMITTED BY APPLICABLE LAW WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. IN ADDITION, WHILE PARTY ON ATTEMPTS TO PROVIDE A GOOD USER EXPERIENCE, WE DO NOT REPRESENT OR WARRANT THAT: (A) THE SERVICES WILL ALWAYS BE SECURE, ERROR-FREE, OR TIMELY; (B) THE SERVICES WILL ALWAYS FUNCTION WITHOUT DELAYS, DISRUPTIONS, OR IMPERFECTIONS; OR (C) THAT ANY PARTY ON CONTENT, USER CONTENT, OR INFORMATION YOU OBTAIN ON OR THROUGH THE SERVICES WILL BE TIMELY OR ACCURATE. PARTY ON TAKES NO RESPONSIBILITY AND ASSUMES NO LIABILITY FOR ANY CONTENT THAT YOU, ANOTHER USER, OR A THIRD PARTY CREATES, UPLOADS, POSTS, SENDS, RECEIVES, OR STORES ON OR THROUGH OUR SERVICES. YOU UNDERSTAND AND AGREE THAT YOU MAY BE EXPOSED TO CONTENT THAT MIGHT BE OFFENSIVE, ILLEGAL, MISLEADING, OR OTHERWISE INAPPROPRIATE, NONE OF WHICH PARTY ON WILL BE RESPONSIBLE FOR.


16. Limitation of Liability

TO THE MAXIMUM EXTENT PERMITTED BY LAW, PARTY ON AND OUR MANAGING MEMBERS, SHAREHOLDERS, EMPLOYEES, AFFILIATES, LICENSORS, AND SUPPLIERS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR MULTIPLE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM: (A) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES; (B) THE CONDUCT OR CONTENT OF OTHER USERS OR THIRD PARTIES ON OR THROUGH THE SERVICES; OR (C) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR CONTENT, EVEN IF PARTY ON HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN NO EVENT WILL PARTY ON'S AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICES. LUSION OR LIMITATION OF CERTAIN DAMAGES, SO SOME OR ALL OF THE EXCLUSIONS AND LIMITATIONS IN THIS SECTION MAY NOT APPLY TO YOU.


IN NO EVENT WILL PARTY ON, ITS AFFILIATES OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, OUR SERVICE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON OUR SERVICE OR SUCH OTHER WEBSITES OR ANY SERVICES OR ITEMS OBTAINED THROUGH OUR SERVICE OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF OPPORTUNITY, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA OR INCREASE IN DATA USAGE ON YOUR MOBILE DEVICES, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT OR OTHERWISE, EVEN IF FORESEEABLE. IN NO EVENT SHALL PARTY ON BE LIABLE FOR ANY DAMAGES WHATSOEVER, WHETHER DIRECT, INDIRECT, GENERAL, SPECIAL, EXEMPLARY, COMPENSATORY, CONSEQUENTIAL, AND/OR INCIDENTAL, ARISING OUT OF OR RELATING TO THE CONDUCT OF YOU OR ANYONE ELSE IN CONNECTION WITH THE USE OF THE SERVICE, INCLUDING WITHOUT LIMITATION, BODILY INJURY, DEATH, EMOTIONAL DISTRESS, AND/OR ANY OTHER DAMAGES RESULTING FROM COMMUNICATIONS OR MEETINGS WITH OTHER USERS OF THE PARTY ON SERVICE OR PERSONS YOU MEET THROUGH PARTY ON. YOU AGREE TO TAKE REASONABLE PRECAUTIONS IN ALL INTERACTIONS WITH OTHER USERS OF THE SERVICE, PARTICULARLY IF YOU DECIDE TO MEET OFFLINE OR IN PERSON. THE FOREGOING DOES NOT AFFECT ANY LIABILITY WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW


17. Final Terms

•	These Terms make up the entire agreement between you and Party On, and supersede any prior agreements.
•	These Terms do no create or confer any third-party beneficiary rights.
•	If we do not enforce a provision in these Terms, it will not be considered a waiver.
•	We reserve all rights not expressly granted to you.
•	You may not transfer any of your rights or obligations under these Terms without our consent.
•	These Terms were written in English and to the extent the translated version of these Terms conflict with the English version, the English version will control.

Contact Us
E-mail : info@partyon.no
            </Text>
            <Text style={styles.header}>Privacy policy</Text>
            <Text>
            Privacy Contents

1.	Introduction
2.	Information We Collect and How We Collect It
3.	Third-party Information Collection
4.	How We Use Your Information
5.	Disclosure of Your Information
6.	Merger and Acquisition
7.	Your Choices about Our Collection, Use and Disclosure of Your Information
8.	Data Security
9.	Children’s privacy
10.	Transfer of Your Information to the United States
11.	Changes to Our Privacy Policy
12.	Contact Information



1. Introduction

This Privacy Policy explains the information that Party On collect about users through our Service, how we use that information, and with whom we share it. Please read this Privacy Policy carefully to understand our policies and practices regarding your information and how we will treat it. If you do not agree with our policies and practices, do not use our Service, do not use or access our Website and do not download, install, register with or use this App. BY USING OUR SERVICE, INCLUDING DOWNLOADING, REGISTERING WITH OR USING THE APP, YOU ARE ACCEPTING AND CONSENTING TO THE PRACTICES DESCRIBED IN THIS PRIVACY POLICY INCLUDING ANY UPDATES OR AMENDMENTS FROM TIME TO TIME. YOUR CONTINUED USE OF OUR SERVICE AFTER WE MAKE CHANGES IS DEEMED TO BE ACCEPTANCE OF THOSE CHANGES. PLEASE REVIEW THIS PRIVACY POLICY PERIODICALLY FOR UPDATES. IF, FOR ANY REASON, YOU DO NOT AGREE TO THE TERMS OF THIS PRIVACY POLICY, PLEASE DO NOT USE OUR SERVICE. IF YOU HAVE ALREADY INSTALLED THE APP, PLEASE UNINSTALL THE APP IMMEDIATELY. Any capitalized terms used by but not defined in this Privacy Policy shall have the meaning set forth in the Terms of Use.


2. Information We Collect and How We Collect It

We collect information from and about users of our Service (1) automatically when you use our Service or (2) directly from you when you provide it to us.


2.1 Automatic Information Collection

When use our Service, such as download, access and use the App, we may automatically collect certain information on your device. This information includes information about your mobile device and internet connection, including the device's unique device identifier, IP address, operating system, browser type, mobile network information and the device's telephone number. Some of this information is necessary for us to provide and maintain the security of our Services. If you do not want us to collect this information, do not use our Service and do not download or install the App. If you have already installed the App, please uninstall the App immediately. When you Register an Account with us, we may also automatically collect additional information on your Mobile Device. These information include:

•	Device Information. We may collect information about your Mobile Device and internet connection, including the Mobile Device's unique device identifier, IP address, operating system, browser type, mobile network information and the device's telephone number.

•	Location Information. Real-time location information about your Mobile Device when the App is actively running. These location information include, but is not limited to, any information recorded by the GPS from your device, and Wifi SSID, bluetooth ID and beacon identifiers from your environment (“Location Information”).

•	Usage Information. Your usage of this App and third party applications on your devices, and the resources that you access and use on or through the App and third party applications when the App is actively running (together “Usage Information”). Usage Information may include, but is not limited to your preferences and settings such as the time zone, language, privacy and other preferences; the last URL; the buttons, controls and ads clicked; and the length of your usage of the App, the services and features of the App you used, and the online/offline status of the App.

•	Stored Information and Files. Your metadata and other information associated with other files stored on your device. These may include, for example, photographs, audio and video clips, personal contacts and address book information. If you do not want us to automatically collect this additional information, do not download, install or use our Service. We may also use technologies to automatically collect tracking information on your mobile device or your browser with your consent. These technologies include:

•	Cookies and mobile cookies. A cookie is a small file placed on your computer or mobile device. It may be possible to refuse to accept cookies or mobile cookies by activating the appropriate setting on your browser or smartphone. However, if you select this setting you may be unable to access certain parts of our Service.

•	Web Beacons. Certain part of our Service and our e-mails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags and single-pixel gifs) that permit the us, for example, to count users who have visited those pages or opened an e-mail and for other related app statistics (for example, recording the popularity of certain app content and verifying system and server integrity).

•	Behavior tracking. We may use technologies, which can collect information about your activities over time and across third-party websites, apps or other online services (behavioral tracking) with your consent. You may request us to stop the collection of tracking information at any time by adjusting the settings on the App, your mobile device, or contact us at Info@partyon.no .


2.2 Information You Provide to Us.

When you register an Account with us through the third-party social media site facebook, you authorize us to collect certain registration information from your facebook account (“Registration Information”). These include your personally identifiable information such as, name, e-mail address, age, user name, your profile picture, facebook contact list, the profile pictures of the contact list, education, work history, events, relationship status, and likes.
In addition to Registration Information, you may also choose to provide us information about yourself, such as your gender, location, URL, a biography, any additional image or information. We may also collect records and copies of your correspondence (including e-mail addresses and phone numbers) with us. With your consent, we may also collect:

•	Your responses to surveys that we might ask you to complete for research purposes.

•	Any photos, videos, locations and other information you tag.

•	Any other types of information you instruct us to collect.

If you do not wish to provide us these information, please delete your Account by following the directions in the App or by sending us an email to noparty@partyon.no


3. Third-party Information Collection

When you use our Service or its content, certain third parties, such as Your mobile device manufacturer and Your mobile service provider, may use automatic information collection technologies to collect information about you or your device, independent of Party On and our App. Party On cannot reasonably control the activities of these third parties or how they may use Your device to collect Your personal data. These third parties may use tracking technologies to collect information about you when you use the App. The information they collect may be associated with your personal information or they may collect information, including personal information, about your online activities over time and across different websites, apps and other online services websites. They may use this information to provide you with interest-based (behavioral) advertising or other targeted content. Party On do not and cannot reasonably control these third parties' tracking technologies or how they may be used. If you have any questions about an advertisement or other targeted content, you should contact the responsible third parties directly. You can opt out of receiving targeted ads from members of the Network Advertising Initiative ("NAI") on the NAI's website at http://www.networkadvertising.org/choices/. In addition, with your consent, we may provide, certain information with links to and from the App to our partner networks, advertisers and affiliates. If you follow a link to any of these websites, Apps or services, please note that they have their own privacy policies and that we do not accept any responsibility or liability for these policies. Please check the privacy policies of these websites, Apps and services before you submit any personal data to them. Certain websites you visit may provide options regarding advertisements you receive. For more information or to opt out of certain online behavioral advertising, please visit http://www.aboutads.info.


4. How We Use Your Information We use information that we collect about you or that you provide to us, including but not limited to any personal information, Registration Information, Location Information, and Usage Information to:

•	Provide you with our Service.

•	Provide you with any other information, products and services from us or our partners including advertisers.
•	Give you notices about your Account or subscription, including expiration and renewal notices.
•	Carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection.
•	Notify you when an update is available, and of changes to any products or Service we offer or provide through the update.
•	Estimate our audience size and usage patterns.
•	Fulfill any other purpose for which you provide.
•	Store information about your preferences
•	Allow us to customize our App according to your individual interests.
•	Speed up our Service.
•	Recognize you when you use our Service.
•	Perform any data analysis necessary to perform our Service. If you do not want us to use your information this way, please do not register an Account with us, or if you have registered already, please delete your Account.


5. Disclosure of Your Information

In general, we do not share your personal information with a third party without your consent. In particular, we do not share your name, address or email address. The information we make available to other companies depends on the nature of our relationships with them. We generally require these other companies to keep our users’ information confidential. We do not share your GPS location with other Users without our consent. In order to provide our Service, we share the distance between you and a Party On users with your consent. We may, however, share your personal information we collect:
•	With our subsidiaries and parent.
•	With contractors, service providers and other third parties we use to support our business and who are bound by contractual obligations to keep personal information confidential and use it only for the purposes for which we disclose it to them.
•	To fulfill the purpose for which you provide it.
•	For any other purpose disclosed by us when you provide the information.
•	To comply with any court order, law or legal process, including to respond to any government or regulatory request.
•	To enforce our rights arising from any contracts entered into between you and us, including the App EULA, Terms of Use and for billing and collection.
•	If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of Party On, our customers or others. This includes exchanging information with other companies and organizations for the purposes of fraud protection and credit risk reduction. We may share aggregated information about our users and information that does not identify any individual or device to our partners in order to offer you our Services.


6. Merger and Acquisition

We will strive to protect your privacy even in the event of a merger, divestiture, restructuring, reorganization, dissolution or other sale or transfer, in which of some or all of our assets in which personal information held by us about our registered users is among the assets transferred (a “Transfer”). In addition, prior to the conclusion of such a Transfer, we will post a notice on our Website and our App to inform you of the prospect of such a Transfer prior to the concluding of such a Transfer. You may choose to delete your Account with us at that time, in which case, your personal information will not be among the assets transferred. It is our intention that any buyer or successor of Party On during such a Transfer will be bound by the Term of Use and Privacy Policy.


7. Your Choices about Our Collection, Use and Disclosure of Your Information

To the extent we display advertising on Party On, we may allow advertisers and advertising networks to collect information about your mobile device (including mobile device IDs), activities, and geographic location to enable them to display targeted ads to you. If you do not want us to use information that we collect or that you provide to us to deliver advertisements to you, you can choose to not register an Account with us or if you already have an Account, deleting that Account. We allow analytics companies to use tracking technologies to collect information about our users’ computers or mobile devices and their online activities. These companies analyze this information to help us understand how our sites and apps are being used. Analytics companies may use mobile device IDs, as described in the paragraph below (“Mobile device IDs”). Unlike cookies, device IDs cannot be deleted. Mobile device IDs: In order to recognize you, store your preferences, and track your use of our application, we may store your mobile device IDs (the unique identifier assigned to a device by the manufacturer) when you use the Party On application. Unlike cookies, device IDs cannot be deleted. Some browsers, Apps and devices support a “Do Not Track” feature, which is intended to be a signal to websites that you do not wish to be tracked across different websites you visit. The Service do not currently change the way they operate based upon detection of a Do Not Track or similar signal.


8. Data Security

We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration and disclosure. All information you provide to us is stored on our secure servers behind firewalls. The safety and security of your information also depends on you. Where we have given you (or where you have chosen) a password for access to certain parts of our Service, you are responsible for keeping this password confidential. We ask you not to share your password with anyone. Unfortunately, the transmission of information via the internet and mobile platforms is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted through our Service. Any transmission of personal information is at your own risk. We are not responsible for circumvention of any privacy settings or security measures we provide. 9. Children’s privacy The Service is not intended for children under 18 years of age, and we do not knowingly collect or market personal information from children under 18. If we learn we have collected or received personal information from a child under 18 without verification of parental consent, we will delete that information. If you believe we might have any information from or about a child under 18, please contact us at info@partyon.no 10. Transfer of Your Information to the Norway The Service is operated from Norway. If you are located anywhere outside of Norway, please be aware that information we collect, including, personal information, may be transferred to, processed and stored in Norway. Where the data transfer route is no longer available, an appropriate alternative will be put in place. Data may also be accessed by vendors from other locations in compliance with the requirements of the EU data protection laws. The data protection laws in the United States may differ from those of the country in which you are located, and your personal information may be subject to access requests from governments, courts, or law enforcement in the United States according to its laws. By using our services or providing us with any information, you consent to this transfer, processing and storage of your information in Norway. 11. Changes to Our Privacy Policy We may update our Privacy Policy from time to time. If we make material changes to how we treat our users personal information, we will post the new privacy policy on http//:partyon.no. The date the Privacy Policy was last revised is identified at the top of the page. You are responsible for periodically visiting this Account to check for any changes. 13. Contact Information To ask questions or comment about this Account and our privacy practices, contact us at:

Email: info@partyon.no
            </Text>
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  wrapper: {
    padding: 40,
  },
  header: {
    fontSize: 17,
    fontWeight: '500',
    color: '#ff0055',
    marginTop: 20,
    marginBottom: 20,
  }
});

module.exports = Legal;
