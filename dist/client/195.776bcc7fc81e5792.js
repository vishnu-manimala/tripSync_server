"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[195],{8195:(A,m,a)=>{a.r(m),a.d(m,{RegisterModule:()=>F});var u=a(6814),l=a(1730),o=a(95),d=a(218),e=a(9468),g=a(2333);function c(r,i){1&r&&(e.TgZ(0,"span",22),e._uU(1,"*Name is required"),e.qZA())}function f(r,i){1&r&&(e.TgZ(0,"span",23),e._uU(1,"*Phone Number is required"),e.qZA())}function h(r,i){1&r&&(e.TgZ(0,"span",23),e._uU(1,"*Enter a valid Phone number"),e.qZA())}function _(r,i){1&r&&(e.TgZ(0,"span",23),e._uU(1,"*Not a valid phone number"),e.qZA())}function Z(r,i){1&r&&(e.TgZ(0,"span",23),e._uU(1,"*Not a valid phone number"),e.qZA())}function w(r,i){1&r&&(e.TgZ(0,"span",23),e._uU(1,"*Email is required"),e.qZA())}function x(r,i){1&r&&(e.TgZ(0,"span",23),e._uU(1,"*Enter a valid email"),e.qZA())}function y(r,i){1&r&&(e.TgZ(0,"span",23),e._uU(1,"*Password is required"),e.qZA())}function T(r,i){1&r&&(e.TgZ(0,"span",23),e._uU(1,"*Password is not matching"),e.qZA())}function v(r,i){1&r&&(e.TgZ(0,"span",23),e._uU(1,"*confirm Password is required"),e.qZA())}function q(r,i){1&r&&(e.TgZ(0,"span",24),e._uU(1,"Something went wrong!!"),e.qZA())}const b=[{path:"",component:(()=>{class r{constructor(n,s,t){this._router=n,this._form=s,this._authService=t,this.isError=!1,this.imageUrl="../../../assets/tp.png",this.registerForm=this._form.group({name:this._form.control("",o.kI.required),phone:this._form.control("",o.kI.compose([o.kI.pattern(/^\d{10}$/),o.kI.minLength(10),o.kI.maxLength(10),o.kI.required])),email:this._form.control("",o.kI.compose([o.kI.required,o.kI.email])),password:this._form.control("",o.kI.compose([o.kI.required])),confirm_password:this._form.control("",o.kI.required)},{validators:[(0,d.i)("password","confirm_password")]})}navigateToLogin(){this._router.navigate(["auth"])}passwordMatchValidator(n){console.log("in pass");const s=n.get("password")?.value,t=n.get("confirm_password")?.value;return console.log("pas",s!==t),s!==t}registerSubmit(){console.log("Register form",this.registerForm.value),this.registerForm.valid&&(this.passwordMatchValidator(this.registerForm)||(this.registerSubscription=this._authService.registerUser(this.registerForm.value).subscribe(n=>{console.log(n),"success"===n?this._router.navigate(["auth"]):this.isError=!0})))}ngOnDestroy(){this.registerSubscription&&this.registerSubscription.unsubscribe()}static#e=this.\u0275fac=function(s){return new(s||r)(e.Y36(l.F0),e.Y36(o.qu),e.Y36(g.e))};static#r=this.\u0275cmp=e.Xpm({type:r,selectors:[["app-register"]],decls:43,vars:13,consts:[[1,"flex","justify-center","md:justify-start","pt-12","md:pl-12","md:-mb-12"],["alt","logo",1,"h-20","w-28",3,"src"],[1,"flex","flex-col","justify-center","md:justify-start","my-auto","md:pt-0","px-8","md:px-24","lg:px-32"],[1,"text-center","text-3xl"],[1,"flex","flex-col","md:pt-8",3,"formGroup","submit"],[1,"flex","flex-col","pt-1"],["for","name",1,"text-lg"],["type","text","id","name","formControlName","name","placeholder","John Smith",1,"shadow","appearance-none","border","rounded","w-full","py-2","px-3","text-gray-700","mt-1","leading-tight","focus:outline-none","focus:shadow-outline"],["class","text-danger text-center ps-2 pt-2 col-12",4,"ngIf"],["for","phone",1,"text-lg"],["type","number","id","phone","formControlName","phone","placeholder","Contact Number",1,"shadow","appearance-none","border","rounded","w-full","py-2","px-3","text-gray-700","mt-1","leading-tight","focus:outline-none","focus:shadow-outline"],["class","text-danger text-center ps-2 pt-2 ",4,"ngIf"],["for","email",1,"text-lg"],["type","email","id","email","formControlName","email","placeholder","your@email.com",1,"shadow","appearance-none","border","rounded","w-full","py-2","px-3","text-gray-700","mt-1","leading-tight","focus:outline-none","focus:shadow-outline"],["for","password",1,"text-lg"],["type","password","id","password","formControlName","password","placeholder","Password",1,"shadow","appearance-none","border","rounded","w-full","py-2","px-3","text-gray-700","mt-1","leading-tight","focus:outline-none","focus:shadow-outline"],["for","confirm-password",1,"text-lg"],["type","password","id","confirm-password","formControlName","confirm_password","placeholder","Password",1,"shadow","appearance-none","border","rounded","w-full","py-2","px-3","text-gray-700","mt-1","leading-tight","focus:outline-none","focus:shadow-outline"],["type","submit","value","Register",1,"bg-black","text-white","font-bold","text-lg","hover:bg-gray-700","p-2","mt-2","rounded"],["class","text-center text-red-950",4,"ngIf"],[1,"text-center","pt-6","pb-12"],[1,"underline","font-semibold",3,"click"],[1,"text-danger","text-center","ps-2","pt-2","col-12"],[1,"text-danger","text-center","ps-2","pt-2"],[1,"text-center","text-red-950"]],template:function(s,t){if(1&s&&(e.TgZ(0,"div",0),e._UZ(1,"img",1),e.qZA(),e.TgZ(2,"div",2)(3,"p",3),e._uU(4,"Join Us."),e.qZA(),e.TgZ(5,"form",4),e.NdJ("submit",function(){return t.registerSubmit()}),e.TgZ(6,"div",5)(7,"label",6),e._uU(8,"Name"),e.qZA(),e._UZ(9,"input",7),e.YNc(10,c,2,0,"span",8),e.qZA(),e.TgZ(11,"div",5)(12,"label",9),e._uU(13,"Contact number"),e.qZA(),e._UZ(14,"input",10),e.YNc(15,f,2,0,"span",11),e.YNc(16,h,2,0,"span",11),e.YNc(17,_,2,0,"span",11),e.YNc(18,Z,2,0,"span",11),e.qZA(),e.TgZ(19,"div",5)(20,"label",12),e._uU(21,"Email"),e.qZA(),e._UZ(22,"input",13),e.YNc(23,w,2,0,"span",11),e.YNc(24,x,2,0,"span",11),e.qZA(),e.TgZ(25,"div",5)(26,"label",14),e._uU(27,"Password"),e.qZA(),e._UZ(28,"input",15),e.YNc(29,y,2,0,"span",11),e.qZA(),e.TgZ(30,"div",5)(31,"label",16),e._uU(32,"Confirm Password"),e.qZA(),e._UZ(33,"input",17),e.YNc(34,T,2,0,"span",11),e.YNc(35,v,2,0,"span",11),e.qZA(),e._UZ(36,"input",18),e.YNc(37,q,2,0,"span",19),e.qZA(),e.TgZ(38,"div",20)(39,"p"),e._uU(40,"Already have an account? "),e.TgZ(41,"a",21),e.NdJ("click",function(){return t.navigateToLogin()}),e._uU(42,"Log in here."),e.qZA()()()()),2&s){let p;e.xp6(1),e.Q6J("src",t.imageUrl,e.LSH),e.xp6(4),e.Q6J("formGroup",t.registerForm),e.xp6(5),e.Q6J("ngIf",t.registerForm.hasError("required","name")&&t.registerForm.controls.name.dirty),e.xp6(5),e.Q6J("ngIf",t.registerForm.hasError("required","phone")&&t.registerForm.controls.phone.dirty),e.xp6(1),e.Q6J("ngIf",t.registerForm.hasError("pattern","phone")&&t.registerForm.controls.phone.dirty),e.xp6(1),e.Q6J("ngIf",t.registerForm.hasError("minLength","phone")&&t.registerForm.controls.phone.dirty),e.xp6(1),e.Q6J("ngIf",t.registerForm.hasError("maxLength","phone")&&t.registerForm.controls.phone.dirty),e.xp6(5),e.Q6J("ngIf",t.registerForm.hasError("required","email")&&t.registerForm.controls.email.dirty),e.xp6(1),e.Q6J("ngIf",t.registerForm.hasError("email","email")&&t.registerForm.controls.email.dirty),e.xp6(5),e.Q6J("ngIf",t.registerForm.hasError("required","password")&&t.registerForm.controls.password.dirty),e.xp6(5),e.Q6J("ngIf",null==(p=t.registerForm.get("confirm_password"))?null:p.hasError("confirmPasswordValidator")),e.xp6(1),e.Q6J("ngIf",t.registerForm.hasError("required","confirm_password")&&t.registerForm.controls.confirm_password.dirty),e.xp6(2),e.Q6J("ngIf",t.isError)}},dependencies:[u.O5,o._Y,o.Fj,o.wV,o.JJ,o.JL,o.sg,o.u]})}return r})()}];let U=(()=>{class r{static#e=this.\u0275fac=function(s){return new(s||r)};static#r=this.\u0275mod=e.oAB({type:r});static#t=this.\u0275inj=e.cJS({imports:[l.Bz.forChild(b),l.Bz]})}return r})(),F=(()=>{class r{static#e=this.\u0275fac=function(s){return new(s||r)};static#r=this.\u0275mod=e.oAB({type:r});static#t=this.\u0275inj=e.cJS({imports:[u.ez,U,o.u5,o.UX]})}return r})()}}]);