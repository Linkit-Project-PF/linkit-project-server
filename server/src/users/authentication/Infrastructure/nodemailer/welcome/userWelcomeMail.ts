/* eslint-disable no-tabs */
import { type MongoUser } from '../../../../domain/user/user.entity'
import { type IMessage } from '../add-email'

export const userWelcomeMailCreate = (user: MongoUser): IMessage => {
  const message = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title>¡Te damos la bienvenida a LinkIT! 😊</title><!--[if (mso 16)]>
  <style type="text/css">
  a {text-decoration: none;}
  </style>
  <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
  <o:AllowPNG></o:AllowPNG>
  <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]--><!--[if !mso]><!-- --><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i"><!--<![endif]--><!--[if mso]>
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
--></head><body class="body"><span class="esd-hidden-preheader" style="display:none!important;font-size:0px;line-height:0;color:#ffffff;visibility:hidden;opacity:0;height:0;width:0;mso-hide:all;">Prepárate para explorar el emocionante mundo de proyectos IT.</span><div dir="ltr" class="es-wrapper-color"><!--[if gte mso 9]>
    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
      <v:fill type="tile" color="#f6f6f6"></v:fill>
    </v:background>
  <![endif]--><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="esd-email-paddings" valign="top"><table class="esd-header-popover es-header" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td class="esd-stripe" align="center"><table class="es-header-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tbody><tr><td class="es-p20t es-p20r es-p20l esd-structure" align="left"><!--[if mso]><table width="560" cellpadding="0"
                          cellspacing="0"><tr><td width="180" valign="top"><![endif]--><table class="es-left" cellspacing="0" cellpadding="0" align="left"><tbody><tr>
              
          <td class="es-m-p0r es-m-p20b esd-container-frame" width="180" valign="top" align="center">
              <table width="100%" cellspacing="0" cellpadding="0">
                  <tbody><tr><td align="center" class="esd-empty-container" style="display: none"></td>
              </tr></tbody></table>
          </td>
      
              
      </tr></tbody></table><!--[if mso]></td><td width="20"></td><td width="360" valign="top"><![endif]--><table class="es-right" cellspacing="0" cellpadding="0" align="right"><tbody><tr><td class="esd-container-frame" width="360" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="esd-empty-container" style="display: none;" align="center"></td></tr></tbody></table></td></tr></tbody></table><!--[if mso]></td></tr></table><![endif]--></td></tr></tbody></table></td></tr></tbody></table><table class="es-content" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td class="esd-stripe" align="center"><table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tbody><tr><td class="es-p20t es-p20r es-p20l esd-structure" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="esd-container-frame" width="560" valign="top" align="center"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr>
    <td align="center" class="esd-block-image" style="font-size: 0">
        <a target="_blank">
            <img src="https://fcoqzhd.stripocdn.email/content/guids/CABINET_c5c6e376dd6b2da146dd8238f60741b1854cf9cd35ddc80612282df9e8dff0db/images/linkitmailsbanner2.jpg" alt="" width="560" class="adapt-img">
        </a>
    </td>
</tr><tr>
    <td align="center" class="esd-block-spacer" style="font-size: 0" height="30">
        
    </td>
</tr><tr>
    <td align="left" class="esd-block-text"><p>¡Hola ${user.firstName}! ¿Cómo estás? 😊</p><p>Nos emociona darte la bienvenida a la vibrante <strong>comunidad de LinkIT,</strong> donde conectar con los mejores proyectos IT es más fácil que nunca. ¡Tu talento es una pieza fundamental y estamos encantados de que formes parte de nuestro selecto grupo!</p><p>Al unirte a nosotros, has abierto la puerta a emocionantes oportunidades para trabajar en <strong>proyectos destacados</strong> de manera remota. Nuestra plataforma te conectará con las mejores opciones que se alinean perfectamente con tus <strong>habilidades y aspiraciones profesionales.</strong></p><p>En LinkIT nos esforzamos por brindarte experiencias profesionales <strong>únicas y desafiantes. </strong>Estamos aquí para apoyarte en cada paso de tu viaje y asegurarnos de que encuentres oportunidades que impulsen tu carrera.</p><p>¡Prepárate para explorar el emocionante mundo de proyectos IT de la mano de LinkIT! Si tienes alguna pregunta o necesitas asistencia, nuestro equipo está aquí para ayudarte.</p><p>Descubre las <strong>vacantes disponibles </strong>aquí o sé parte de la base de datos de IT más grande del mundo. ¡Tu próximo gran paso te espera! 🚀</p></td>
</tr><tr>
    <td align="center" class="esd-block-button es-p10t">
        <!--[if mso]><a href="https://www.linkit-hr.com/SoyTalento#vacantes" target="_blank" hidden>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://www.linkit-hr.com/SoyTalento#vacantes" 
              style="height:34px; v-text-anchor:middle; width:169px" arcsize="50%" strokecolor="#00a489" strokeweight="2px" fillcolor="#00a489">
  <w:anchorlock></w:anchorlock>
  <center style='color:#ffffff; font-family:"open sans", "helvetica neue", helvetica, arial, sans-serif; font-size:12px; font-weight:400; line-height:12px;  mso-text-raise:1px'>Descubrir vacantes</center>
</v:roundrect></a>
<![endif]--><!--[if !mso]><!-- --><span class="es-button-border">
            <a class="es-button" target="_blank" style="font-size:14px" href="https://www.linkit-hr.com/SoyTalento#vacantes">Descubrir vacantes</a>
        </span><!--<![endif]-->
    </td>
</tr><tr>
    <td align="center" class="esd-block-spacer" style="font-size: 0" height="30">
        
    </td>
</tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table class="esd-footer-popover es-footer" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td class="esd-stripe" align="center"><table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tbody><tr>
    <td class="esd-structure es-p20t es-p20r es-p20l" align="left" bgcolor="#eaecee" style="background-color:#eaecee">
      
  <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="174" valign="top"><![endif]-->
  <table cellpadding="0" cellspacing="0" class="es-left" align="left">
      
      <tbody><tr>
              
          <td width="174" class="esd-container-frame" align="left">
              <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
                  <tbody><tr>
    <td align="center" class="esd-block-spacer" style="font-size: 0" height="20">
        
    </td>
</tr><tr>
    <td align="center" class="esd-block-image" style="font-size: 0">
        <a target="_blank" href="https://www.linkit-hr.com/">
            <img src="https://fcoqzhd.stripocdn.email/content/guids/CABINET_c5c6e376dd6b2da146dd8238f60741b1854cf9cd35ddc80612282df9e8dff0db/images/linkitmailslogo.png" alt="" width="144">
        </a>
    </td>
</tr><tr>
    <td align="center" class="esd-block-spacer" style="font-size: 0" height="30">
        
    </td>
</tr></tbody></table>
          </td>
      
              
      </tr>
  
  </tbody></table>
  <!--[if mso]></td><td width="20"></td><td width="366" valign="top"><![endif]-->
  <table cellpadding="0" cellspacing="0" class="es-right" align="right">
      
      <tbody><tr>
              
          <td width="366" class="esd-container-frame" align="left">
              <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
                  <tbody><tr>
    <td align="center" class="esd-block-spacer" style="font-size: 0" height="20">
        
    </td>
</tr><tr>
    <td align="left" class="esd-block-text es-text-2110 es-p25t">
        <p style="font-size:14px;line-height:130% !important" align="left" class="es-m-txt-c">Síguenos en LinkedIn para estar al tanto de todas las novedades del mundo IT.</p>
    </td>
</tr><tr>
<td align="left" class="esd-block-social es-p5b es-p15t es-m-txt-c" style="font-size:0">
  <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
    <tbody>
      <tr>
        <td align="center" valign="top">
<a target="_blank" href="https://www.linkedin.com/company/linkit-hr/"><img title="Linkedin" src="https://fcoqzhd.stripocdn.email/content/assets/img/social-icons/circle-black/linkedin-circle-black.png" alt="In" width="26" height="26"></a>
</td>
      </tr>
    </tbody>
  </table>
</td>
</tr><tr>
    <td align="left" class="esd-block-text es-text-7928">
        <p style="font-size:14px;line-height:130% !important;color:#2e2d2c" align="left" class="es-m-txt-c"><strong>www.linkit-hr.com</strong></p>
    </td>
</tr><tr>
    <td align="center" class="esd-block-spacer es-spacer-5262" style="font-size: 0" height="20">
        
    </td>
</tr></tbody></table>
          </td>
      
              
      </tr>
  
  </tbody></table>
  <!--[if mso]></td></tr></table><![endif]-->

    </td>
  </tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div></body></html>
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
