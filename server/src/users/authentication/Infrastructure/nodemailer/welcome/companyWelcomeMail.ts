/* eslint-disable no-tabs */
import { type MongoCompany } from '../../../../domain/company/company.entity'
import { type IMessage } from '../add-email'
import 'dotenv/config'

export const companyWelcomeMailCreate = (company: MongoCompany): IMessage => {
  const message = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title>¡Les damos la bienvenida a LinkIT! 😊</title><!--[if (mso 16)]>
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
--></head><body class="body"><span class="esd-hidden-preheader" style="display:none!important;font-size:0px;line-height:0;color:#ffffff;visibility:hidden;opacity:0;height:0;width:0;mso-hide:all;">Estamos emocionados de colaborar con ustedes para potenciar su equipo con el mejor talento IT.</span><div dir="ltr" class="es-wrapper-color"><!--[if gte mso 9]>
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
            <img src="https://fcoqzhd.stripocdn.email/content/guids/CABINET_de3a6cd6d513b8fb86154f5ba8e714326fc796c06b0496234368bf34e5560202/images/linkitmails_v02banner.jpg" alt="" class="adapt-img" height="140">
        </a>
    </td>
</tr><tr>
    <td align="center" class="esd-block-spacer" style="font-size: 0" height="30">
        
    </td>
</tr><tr>
    <td align="left" class="esd-block-text"><p>¡Hola ${company.companyName}!</p><p>Nos complace darle a<strong> [Nombre de Empresa] </strong>la más cordial bienvenida a la comunidad de LinkIT. Estamos entusiasmados de tenerlos a bordo y ofrecerles acceso a nuestra plataforma líder, donde podrán contratar y escalar con el mejor talento IT <strong>en tan solo 5 días.</strong></p><p>En LinkIT, nos dedicamos a proporcionar <strong>soluciones ágiles y eficientes</strong> para que puedan construir, gestionar y retener a los profesionales más destacados del mundo de la tecnología. Nuestra plataforma le permite acceder a un <strong>pool diverso y altamente calificado</strong> de talento IT, brindándoles la oportunidad de impulsar el éxito de su empresa con rapidez y eficacia.</p><p>Estamos comprometidos a facilitar un proceso de <strong>contratación sin complicaciones</strong> y a ofrecerles un servicio de calidad excepcional. ¡Prepárense para escalar y prosperar con el mejor talento disponible!</p><p>Si prefieres <strong>agendar directamente una reunión</strong>, te facilitamos un enlace a nuestro calendario. Puedes seleccionar el horario que mejor se adapte a tu agenda y asegurarte de que nuestro equipo esté listo para abordar tus inquietudes y discutir cómo podemos ayudarte a alcanzar tus objetivos. Estamos entusiasmados por la oportunidad de colaborar en conjunto 🚀.</p></td>
</tr><tr>
    <td align="center" class="esd-block-button es-p10t">
        <!--[if mso]><a href="https://calendly.com/saleslinkit" target="_blank" hidden>
  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://calendly.com/saleslinkit" 
              style="height:34px; v-text-anchor:middle; width:154px" arcsize="50%" strokecolor="#00a489" strokeweight="2px" fillcolor="#00a489">
      <w:anchorlock></w:anchorlock>
      <center style='color:#ffffff; font-family:"open sans", "helvetica neue", helvetica, arial, sans-serif; font-size:12px; font-weight:400; line-height:12px;  mso-text-raise:1px'>Agendar reunión</center>
  </v:roundrect></a>
<![endif]--><!--[if !mso]><!-- --><span class="es-button-border">
            <a class="es-button" target="_blank" style="font-size:14px" href="https://calendly.com/saleslinkit">Agendar reunión</a>
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
            <img src="https://fcoqzhd.stripocdn.email/content/guids/CABINET_de3a6cd6d513b8fb86154f5ba8e714326fc796c06b0496234368bf34e5560202/images/linkitmails_v02logo.png" alt="" width="144">
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
      name: company.companyName,
      email: company.email
    },
    from: {
      name: 'LinkIT',
      email: `${process.env.NODEMAILER_USER}`
    },
    subject: '¡Les damos la bienvenida a LinkIT! 😊',
    html: message
  }
}
