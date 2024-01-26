/* eslint-disable no-tabs */
import { type MongoUser } from '../../../../domain/user/user.entity'
import { type MongoJd } from '../../../../../posts/domain/jd/jd.entity'
import { type IMessage } from '../add-email'
import 'dotenv/config'

export const postulationMailCreate = (user: MongoUser, jd: MongoJd): IMessage => {
  const message = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title>Gracias por postularte para la posición de (Código - Nombre de posición).</title><!--[if (mso 16)]>
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
--></head><body class="body"><span class="esd-hidden-preheader" style="display:none!important;font-size:0px;line-height:0;color:#ffffff;visibility:hidden;opacity:0;height:0;width:0;mso-hide:all;">¡Te deseamos mucho éxito en el proceso de selección!</span><div dir="ltr" class="es-wrapper-color"><!--[if gte mso 9]>
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
    <td align="left" class="esd-block-text"><p>¡Hola ${user.firstName} 😊!</p><p>Muchas gracias por interesarte en la posición de <strong>(${jd.code} - ${jd.title})</strong> y por enviar tu solicitud.</p><p>Queremos informarte que nuestro equipo de selección está actualmente revisando todas las aplicaciones recibidas. Si consideramos que tu perfil puede ajustarse a lo que estamos buscando, uno de nuestros reclutadores se pondrá en contacto contigo para dar continuidad al proceso de selección.</p><p>¡Bienvenido/a al exclusivo universo de oportunidades tecnológicas en LinkIT! Te encuentras ahora en el epicentro del pool de talento global en tecnología, respaldado por la confianza de <strong>más de 500 empresas líderes.</strong></p><p>Aprovechamos esta ocasión para expresar nuestro agradecimiento por tu interés en LinkIT. Valoramos el tiempo y esfuerzo que has dedicado a presentar tu candidatura.</p><p>Si tienes alguna pregunta o necesitas información adicional, ¡no dudes en ponerte en contacto con nosotros! Agradecemos nuevamente tu interés y te deseamos mucho éxito en el proceso de selección 🚀</p></td>
</tr><tr>
    <td align="center" class="esd-block-spacer" style="font-size: 0" height="30">
        
    </td>
</tr><tr>
    <td align="left" class="esd-block-text">
        <p align="center">Síguenos en <strong>LinkedIn</strong> para estar al tanto de todas las novedades del mundo IT.</p>
    </td>
</tr><tr>
    <td align="center" class="esd-block-spacer" style="font-size: 0" height="12">
        
    </td>
</tr><tr>
    <td align="center" class="esd-block-button">
        <!--[if mso]><a href="https://www.linkedin.com/company/linkit-hr" target="_blank" hidden>
  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://www.linkedin.com/company/linkit-hr" 
              style="height:34px; v-text-anchor:middle; width:111px" arcsize="50%" strokecolor="#00a489" strokeweight="2px" fillcolor="#00a489">
      <w:anchorlock></w:anchorlock>
      <center style='color:#ffffff; font-family:"open sans", "helvetica neue", helvetica, arial, sans-serif; font-size:12px; font-weight:400; line-height:12px;  mso-text-raise:1px'>¡Síguenos!</center>
  </v:roundrect></a>
<![endif]--><!--[if !mso]><!-- --><span class="es-button-border">
            <a href="https://www.linkedin.com/company/linkit-hr" class="es-button" target="_blank" style="font-size:14px">¡Síguenos!</a>
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
        <p style="font-size:14px;line-height:130% !important" align="left" class="es-m-txt-c">Conectando al talento más destacado<br>con los mejores proyectos IT.</p>
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
      email: `${process.env.NODEMAILER_USER}`
    },
    subject: `Gracias por postularte para la posición de (${jd.code} - ${jd.title}).`,
    html: message
  }
}
