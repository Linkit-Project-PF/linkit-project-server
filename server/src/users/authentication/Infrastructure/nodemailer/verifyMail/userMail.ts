/* eslint-disable no-tabs */
import { type UserEntity } from '../../../../domain/user/user.entity'
import { type IMessage } from '../add-email'

export const userMailCreate = (user: UserEntity): IMessage => {
  const message = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title></title>
  <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]-->
  <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
  <!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]-->
 <!--[if mso]>
 <style type="text/css">
     ul {
  margin: 0 !important;
  }
  ol {
  margin: 0 !important;
  }
  li {
  margin-left: 47px !important;
  }

 </style><![endif]
--></head>
 <body class="body">
  <div dir="ltr" class="es-wrapper-color">
   <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#fafafa"></v:fill>
			</v:background>
		<![endif]-->
   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
     <tr>
      <td class="esd-email-paddings" valign="top">
       <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">
        <tbody>
         <tr>
          <td class="esd-stripe esd-synchronizable-module" align="center">
           <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
            <tbody>
             <tr>
              <td class="esd-structure es-p50t es-p5b es-p120l es-p120r" align="left">
               <table cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                 <tr>
                      
                  <td width="360" class="esd-container-frame" align="center" valign="top">
                      <table cellpadding="0" cellspacing="0" width="100%">
                          <tbody><tr>
            <td align="center" class="esd-block-image" style="font-size: 0">
                <a target="_blank">
                    <img class="adapt-img" src="https://fcoqzhd.stripocdn.email/content/guids/CABINET_43b45519799d201a2b57e63f4ea687bca879216df4f4c7dc05c38df3b54f4ab9/images/image_a5O.png" alt="" width="360">
                </a>
            </td>
        </tr></tbody></table>
                  </td>
              
                      
              </tr>
                </tbody>
               </table></td>
             </tr>
            </tbody>
           </table></td>
         </tr>
        </tbody>
       </table>
       
       <table cellpadding="0" cellspacing="0" class="es-content" align="center">
        <tbody>
         <tr>
          <td class="esd-stripe" align="center">
           <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
            <tbody>
             <tr>
              <td class="esd-structure es-p30r es-p30b es-p30l es-p15t" align="left">
               <table cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                 <tr>
                  <td width="540" class="esd-container-frame" align="center" valign="top">
                   <table cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                     
                     <tr>
                      <td align="center" class="esd-block-text es-p10b es-m-txt-c"><h1 style="font-size: 46px; line-height: 100%;">Confirm Your Email</h1></td>
                     </tr>
                     <tr>
                      <td align="center" class="esd-block-text es-p5t es-p5b es-p40r es-p40l es-m-p0r es-m-p0l"><p>You’ve received this message because your email address has been registered with our site. Please click the button below to verify your email address and confirm that you are the owner of this account.</p></td>
                     </tr>
                     <tr>
                      <td align="center" class="esd-block-text es-p10t es-p5b"><p>If you did not register with us, please disregard this email.</p></td>
                     </tr>
                     <tr>
                      <td align="center" class="esd-block-button es-p10t es-p10b"><span class="es-button-border" style="border-radius: 6px;"><a href="https://link-it-project.vercel.app/" class="es-button" target="_blank" style="border-left-width: 30px; border-right-width: 30px; border-radius: 6px;">CONFIRM YOUR EMAIL</a></span></td>
                     </tr>
                     <tr>
                      <td align="center" class="esd-block-text es-p5t es-p5b es-p40r es-p40l es-m-p0r es-m-p0l"><p>Once confirmed, this email will be uniquely associated with your account.</p></td>
                     </tr>
                    </tbody>
                   </table></td>
                 </tr>
                </tbody>
               </table></td>
             </tr>
            </tbody>
           </table></td>
         </tr>
        </tbody>
       </table>
       <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
        <tbody>
         <tr>
          <td class="esd-stripe esd-synchronizable-module" align="center">
           <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" width="640" style="background-color: transparent;">
            <tbody>
             <tr>
              <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" align="left">
               <table cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                 <tr>
                  <td width="600" class="esd-container-frame" align="left">
                   <table cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                     <tr>
                      <td align="center" class="esd-block-social es-p15t es-p15b" style="font-size:0">
                       <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                        <tbody>
                         <tr>
                          <td align="center" valign="top" class="es-p40r"><a target="_blank" href=""><img title="Facebook" src="https://fcoqzhd.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32"></a></td>
                          <td align="center" valign="top" class="es-p40r"><a target="_blank" href=""><img title="X.com" src="https://fcoqzhd.stripocdn.email/content/assets/img/social-icons/logo-black/x-logo-black.png" alt="X" width="32"></a></td>
                          <td align="center" valign="top" class="es-p40r"><a target="_blank" href=""><img title="Instagram" src="https://fcoqzhd.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32"></a></td>
                          <td align="center" valign="top"><a target="_blank" href=""><img title="Youtube" src="https://fcoqzhd.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32"></a></td>
                         </tr>
                        </tbody>
                       </table></td>
                     </tr>
                     <tr>
                      <td align="center" class="esd-block-text es-p35b"><p>Style Casual&nbsp;© 2021 Style Casual, Inc. All Rights Reserved.</p><p>4562 Hazy Panda Limits, Chair Crossing, Kentucky, US, 607898</p></td>
                     </tr>
                     <tr>
                      <td class="esd-block-menu" esd-tmp-menu-padding="5|5" esd-tmp-divider="1|solid|#cccccc" esd-tmp-menu-color="#999999">
                       <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                        <tbody>
                         <tr>
                          <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px;"><a target="_blank" href="https://" style="color: #999999;">Visit Us </a></td>
                          <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #cccccc;"><a target="_blank" href="https://" style="color: #999999;">Privacy Policy</a></td>
                          <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #cccccc;"><a target="_blank" href="https://" style="color: #999999;">Terms of Use</a></td>
                         </tr>
                        </tbody>
                       </table></td>
                     </tr>
                    </tbody>
                   </table></td>
                 </tr>
                </tbody>
               </table></td>
             </tr>
            </tbody>
           </table></td>
         </tr>
        </tbody>
       </table>
       <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
        <tbody>
         <tr>
          <td class="esd-stripe esd-synchronizable-module" align="center">
           <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
            <tbody>
             <tr>
              <td class="esd-structure es-p20" align="left">
               <table cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                 <tr>
                  <td width="560" class="esd-container-frame" align="center" valign="top">
                   <table cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                     <tr>
                      <td align="center" class="esd-block-text es-infoblock"><p><a target="_blank"></a>No longer want to receive these emails?&nbsp;<a href="" target="_blank">Unsubscribe</a>.<a target="_blank"></a></p></td>
                     </tr>
                    </tbody>
                   </table></td>
                 </tr>
                </tbody>
               </table></td>
             </tr>
            </tbody>
           </table></td>
         </tr>
        </tbody>
       </table></td>
     </tr>
    </tbody>
   </table>
  </div>
 
</body></html>
  `
  return {
    to: {
      name: user.firstName + ' ' + user.lastName,
      email: user.email
    },
    from: {
      name: 'LinkIT',
      email: 'juanvelez.personal@gmail.com'
    },
    subject: '',
    html: message
  }
}
