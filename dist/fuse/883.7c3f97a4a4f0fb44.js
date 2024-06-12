"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[883],{2883:(B,l,a)=>{a.r(l),a.d(l,{AuthForgotPasswordModule:()=>j});var d=a(4521),f=a(7423),m=a(7322),u=a(5245),c=a(7531),p=a(773),g=a(5804),h=a(7775),w=a(2805),n=a(3075),_=a(8288),x=a(4485),o=a(5e3),A=a(8951),Z=a(9808),P=a(2494);const v=["forgotPasswordNgForm"];function y(t,s){if(1&t&&(o.TgZ(0,"fuse-alert",24),o._uU(1),o.qZA()),2&t){const r=o.oxw();o.Q6J("appearance","outline")("showIcon",!1)("type",r.alert.type)("@shake","error"===r.alert.type),o.xp6(1),o.hij(" ",r.alert.message," ")}}function T(t,s){1&t&&(o.TgZ(0,"mat-error"),o._uU(1," Email address is required "),o.qZA())}function F(t,s){1&t&&(o.TgZ(0,"mat-error"),o._uU(1," Please enter a valid email address "),o.qZA())}function C(t,s){1&t&&(o.TgZ(0,"span"),o._uU(1," Send reset OTP "),o.qZA())}function I(t,s){1&t&&o._UZ(0,"mat-progress-spinner",32),2&t&&o.Q6J("diameter",24)("mode","indeterminate")}function J(t,s){if(1&t){const r=o.EpF();o.TgZ(0,"form",25,26)(2,"mat-form-field",27)(3,"mat-label"),o._uU(4,"Email address"),o.qZA(),o._UZ(5,"input",28),o.YNc(6,T,2,0,"mat-error",29),o.YNc(7,F,2,0,"mat-error",29),o.qZA(),o.TgZ(8,"button",30),o.NdJ("click",function(){return o.CHM(r),o.oxw().sendResetLink()}),o.YNc(9,C,2,0,"span",29),o.YNc(10,I,1,2,"mat-progress-spinner",31),o.qZA()()}if(2&t){const r=o.oxw();o.Q6J("formGroup",r.forgotPasswordForm),o.xp6(5),o.Q6J("formControlName","email"),o.xp6(1),o.Q6J("ngIf",r.forgotPasswordForm.get("email").hasError("required")),o.xp6(1),o.Q6J("ngIf",r.forgotPasswordForm.get("email").hasError("email")),o.xp6(1),o.Q6J("color","primary")("disabled",r.forgotPasswordForm.disabled),o.xp6(1),o.Q6J("ngIf",!r.forgotPasswordForm.disabled),o.xp6(1),o.Q6J("ngIf",r.forgotPasswordForm.disabled)}}function U(t,s){1&t&&(o.TgZ(0,"mat-error"),o._uU(1," OTP is required "),o.qZA())}function N(t,s){1&t&&o._UZ(0,"mat-icon",40),2&t&&o.Q6J("svgIcon","heroicons_solid:eye")}function b(t,s){1&t&&o._UZ(0,"mat-icon",40),2&t&&o.Q6J("svgIcon","heroicons_solid:eye-off")}function Q(t,s){1&t&&(o.TgZ(0,"mat-error"),o._uU(1," Password is required "),o.qZA())}function q(t,s){1&t&&(o.TgZ(0,"mat-error"),o._uU(1," Password is required "),o.qZA())}function Y(t,s){1&t&&(o.TgZ(0,"mat-error"),o._uU(1," Password should match "),o.qZA())}function M(t,s){1&t&&(o.TgZ(0,"span"),o._uU(1," Reset Password "),o.qZA())}function E(t,s){1&t&&o._UZ(0,"mat-progress-spinner",32),2&t&&o.Q6J("diameter",24)("mode","indeterminate")}function k(t,s){if(1&t){const r=o.EpF();o.TgZ(0,"form",33)(1,"mat-form-field",27)(2,"mat-label"),o._uU(3,"OTP"),o.qZA(),o._UZ(4,"input",34),o.YNc(5,U,2,0,"mat-error",29),o.qZA(),o.TgZ(6,"mat-form-field",27)(7,"mat-label"),o._uU(8,"Password"),o.qZA(),o._UZ(9,"input",35,36),o.TgZ(11,"button",37),o.NdJ("click",function(){o.CHM(r);const i=o.MAs(10);return i.type="password"===i.type?"text":"password"}),o.YNc(12,N,1,1,"mat-icon",38),o.YNc(13,b,1,1,"mat-icon",38),o.qZA(),o.YNc(14,Q,2,0,"mat-error",29),o.qZA(),o.TgZ(15,"mat-form-field",27)(16,"mat-label"),o._uU(17,"Confirm Password"),o.qZA(),o._UZ(18,"input",39),o.YNc(19,q,2,0,"mat-error",29),o.YNc(20,Y,2,0,"mat-error",29),o.qZA(),o.TgZ(21,"button",30),o.NdJ("click",function(){return o.CHM(r),o.oxw().resetPassword()}),o.YNc(22,M,2,0,"span",29),o.YNc(23,E,1,2,"mat-progress-spinner",31),o.qZA()()}if(2&t){const r=o.MAs(10),e=o.oxw();o.Q6J("formGroup",e.reset_password_form),o.xp6(4),o.Q6J("formControlName","otp"),o.xp6(1),o.Q6J("ngIf",e.reset_password_form.get("otp").hasError("required")),o.xp6(4),o.Q6J("formControlName","password"),o.xp6(3),o.Q6J("ngIf","password"===r.type),o.xp6(1),o.Q6J("ngIf","text"===r.type),o.xp6(1),o.Q6J("ngIf",e.reset_password_form.get("password").hasError("required")),o.xp6(4),o.Q6J("formControlName","confirm_password"),o.xp6(1),o.Q6J("ngIf",e.reset_password_form.get("confirm_password").hasError("required")),o.xp6(1),o.Q6J("ngIf",e.reset_password_form.get("confirm_password").hasError("mustMatch")),o.xp6(1),o.Q6J("color","primary")("disabled",e.reset_password_form.disabled),o.xp6(1),o.Q6J("ngIf",!e.reset_password_form.disabled),o.xp6(1),o.Q6J("ngIf",e.reset_password_form.disabled)}}const O=function(){return["/sign-in"]},R=[{path:"",component:(()=>{class t{constructor(r,e,i){this._authService=r,this._formBuilder=e,this.router=i,this.alert={type:"success",message:""},this.showAlert=!1,this.show_reset_form=!1}ngOnInit(){this.forgotPasswordForm=this._formBuilder.group({email:["",[n.kI.required,n.kI.email]]}),this.reset_password_form=this._formBuilder.group({user_id:new n.NI("",n.kI.required),otp:new n.NI("",n.kI.required),password:new n.NI("",n.kI.required),confirm_password:new n.NI("",n.kI.required)},{validators:x.a.mustMatch("password","confirm_password")})}sendResetLink(){this.forgotPasswordForm.invalid||(this.forgotPasswordForm.disable(),this.showAlert=!1,this._authService.sendResetOTP({mail:this.forgotPasswordForm.get("email").value}).subscribe({next:r=>{console.log(r),this.showAlert=!0,r.success?(this.alert={type:"success",message:"Password reset sent! You'll receive an email in the entered mail id."},this.reset_password_form.patchValue({user_id:r.data.user_id}),this.show_reset_form=!0):this.alert={type:"error",message:"Email does not found! Are you sure you are already a member?"},setTimeout(()=>this.showAlert=!1,2e3)},complete:()=>this.forgotPasswordForm.enable(),error:()=>{this.showAlert=!0,this.alert={type:"error",message:"Email does not found! Are you sure you are already a member?"},setTimeout(()=>this.showAlert=!1,2e3),this.forgotPasswordForm.enable()}}))}resetPassword(){this.reset_password_form.invalid||(this.reset_password_form.disable(),this._authService.resetUserPassword(this.reset_password_form.value).subscribe({next:r=>{console.log(r),this.showAlert=!0,this.alert={type:r.success?"success":"error",message:r.message},r.success&&(this.reset_password_form.reset(),this.show_reset_form=!1,this.router.navigateByUrl("/sign-in")),setTimeout(()=>this.showAlert=!1,2e3)},complete:()=>this.reset_password_form.enable(),error:()=>{this.reset_password_form.enable(),this.showAlert=!0,this.alert={type:"error",message:"Your request cannot be processed. Please try again later."},setTimeout(()=>this.showAlert=!1,2e3)}}))}}return t.\u0275fac=function(r){return new(r||t)(o.Y36(A.e),o.Y36(n.qu),o.Y36(d.F0))},t.\u0275cmp=o.Xpm({type:t,selectors:[["auth-forgot-password"]],viewQuery:function(r,e){if(1&r&&o.Gf(v,5),2&r){let i;o.iGM(i=o.CRH())&&(e.forgotPasswordNgForm=i.first)}},decls:35,vars:7,consts:[[1,"flex","flex-col","sm:flex-row","items-center","md:items-start","sm:justify-center","md:justify-start","flex-auto","min-w-0"],[1,"md:flex","md:items-center","md:justify-end","w-full","sm:w-auto","md:h-full","md:w-1/2","py-8","px-4","sm:p-12","md:p-16","sm:rounded-2xl","md:rounded-none","sm:shadow","md:shadow-none","sm:bg-card"],[1,"w-full","max-w-80","sm:w-80","mx-auto","sm:mx-0"],[1,"w-50"],["src","./assets/images/logo/logo.png",1,"rounded"],[1,"mt-8","text-4xl","font-extrabold","tracking-tight","leading-tight"],[1,"mt-0.5","font-medium"],["class","mt-8 -mb-4",3,"appearance","showIcon","type",4,"ngIf"],["class","mt-8",3,"formGroup",4,"ngIf"],[3,"formGroup",4,"ngIf"],[1,"mt-8","text-md","font-medium","text-secondary"],[1,"ml-1","text-primary-500","hover:underline",3,"routerLink"],[1,"relative","hidden","md:flex","flex-auto","items-center","justify-center","w-1/2","h-full","p-16","lg:px-28","overflow-hidden","bg-gray-800","dark:border-l"],["viewBox","0 0 960 540","width","100%","height","100%","preserveAspectRatio","xMidYMax slice","xmlns","http://www.w3.org/2000/svg",1,"absolute","inset-0","pointer-events-none"],["fill","none","stroke","currentColor","stroke-width","100",1,"text-gray-700","opacity-25"],["r","234","cx","196","cy","23"],["r","234","cx","790","cy","491"],["viewBox","0 0 220 192","width","220","height","192","fill","none",1,"absolute","-top-16","-right-16","text-gray-700"],["id","837c3e70-6c3a-44e6-8854-cc48c737b659","x","0","y","0","width","20","height","20","patternUnits","userSpaceOnUse"],["x","0","y","0","width","4","height","4","fill","currentColor"],["width","220","height","192","fill","url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"],[1,"z-10","relative","w-full","max-w-2xl"],[1,"text-7xl","font-bold","leading-none","text-gray-100"],[1,"mt-6","text-lg","tracking-tight","leading-6","text-gray-400"],[1,"mt-8","-mb-4",3,"appearance","showIcon","type"],[1,"mt-8",3,"formGroup"],["forgotPasswordNgForm","ngForm"],[1,"w-full"],["id","email","matInput","",3,"formControlName"],[4,"ngIf"],["mat-flat-button","",1,"fuse-mat-button-large","w-full","mt-3",3,"color","disabled","click"],[3,"diameter","mode",4,"ngIf"],[3,"diameter","mode"],[3,"formGroup"],["matInput","",3,"formControlName"],["id","password","matInput","","type","password",3,"formControlName"],["passwordField",""],["mat-icon-button","","type","button","matSuffix","",3,"click"],["class","icon-size-5",3,"svgIcon",4,"ngIf"],["matInput","","type","password",3,"formControlName"],[1,"icon-size-5",3,"svgIcon"]],template:function(r,e){1&r&&(o.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),o._UZ(4,"img",4),o.qZA(),o.TgZ(5,"div",5),o._uU(6),o.qZA(),o.TgZ(7,"div",6),o._uU(8),o.qZA(),o.YNc(9,y,2,5,"fuse-alert",7),o.YNc(10,J,11,8,"form",8),o.YNc(11,k,24,14,"form",9),o.TgZ(12,"div",10)(13,"span"),o._uU(14,"Return to"),o.qZA(),o.TgZ(15,"a",11),o._uU(16," sign in "),o.qZA()()()(),o.TgZ(17,"div",12),o.O4$(),o.TgZ(18,"svg",13)(19,"g",14),o._UZ(20,"circle",15)(21,"circle",16),o.qZA()(),o.TgZ(22,"svg",17)(23,"defs")(24,"pattern",18),o._UZ(25,"rect",19),o.qZA()(),o._UZ(26,"rect",20),o.qZA(),o.kcU(),o.TgZ(27,"div",21)(28,"div",22)(29,"div"),o._uU(30,"Welcome to"),o.qZA(),o.TgZ(31,"div"),o._uU(32,"LinkTin"),o.qZA()(),o.TgZ(33,"div",23),o._uU(34," Connecting careers with the right swipe "),o.qZA()()()()),2&r&&(o.xp6(6),o.hij(" ",e.show_reset_form?"Reset Password":" Forgot password?"," "),o.xp6(2),o.hij(" ",e.show_reset_form?"Enter your new password":"Fill the form to reset your password"," "),o.xp6(1),o.Q6J("ngIf",e.showAlert),o.xp6(1),o.Q6J("ngIf",!e.show_reset_form),o.xp6(1),o.Q6J("ngIf",e.show_reset_form),o.xp6(4),o.Q6J("routerLink",o.DdM(6,O)))},directives:[Z.O5,P.W,n._Y,n.JL,n.sg,m.KE,m.hX,c.Nt,n.Fj,n.JJ,n.u,m.TO,f.lW,p.Ou,m.R9,u.Hw,d.yS],encapsulation:2,data:{animation:_.L}}),t})()}];let j=(()=>{class t{}return t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[[d.Bz.forChild(R),f.ot,m.lN,u.Ps,c.c,p.Cq,g.J,h.fC,w.m]]}),t})()}}]);