"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[195],{8195:(C,m,a)=>{a.r(m),a.d(m,{RegisterModule:()=>A});var u=a(6814),l=a(1730),o=a(95),d=a(218),e=a(9468),c=a(2333),g=a(2425);function f(r,n){1&r&&(e.TgZ(0,"span",20),e._uU(1,"*Name is required"),e.qZA())}function h(r,n){1&r&&(e.TgZ(0,"span",21),e._uU(1,"*Phone Number is required"),e.qZA())}function _(r,n){1&r&&(e.TgZ(0,"span",21),e._uU(1,"*Enter a valid Phone number"),e.qZA())}function w(r,n){1&r&&(e.TgZ(0,"span",21),e._uU(1,"*Not a valid phone number"),e.qZA())}function Z(r,n){1&r&&(e.TgZ(0,"span",21),e._uU(1,"*Not a valid phone number"),e.qZA())}function x(r,n){1&r&&(e.TgZ(0,"span",21),e._uU(1,"*Email is required"),e.qZA())}function y(r,n){1&r&&(e.TgZ(0,"span",21),e._uU(1,"*Enter a valid email"),e.qZA())}function T(r,n){1&r&&(e.TgZ(0,"span",21),e._uU(1,"*Password is required"),e.qZA())}function v(r,n){1&r&&(e.TgZ(0,"span",21),e._uU(1,"*Password is not matching"),e.qZA())}function q(r,n){1&r&&(e.TgZ(0,"span",21),e._uU(1,"*confirm Password is required"),e.qZA())}function b(r,n){1&r&&(e.TgZ(0,"span",22),e._uU(1,"Something went wrong!!"),e.qZA())}const U=[{path:"",component:(()=>{class r{constructor(i,s,t,p){this._router=i,this._form=s,this._authService=t,this._toaster=p,this.isError=!1,this.imageUrl="../../../assets/tp.png",this.registerForm=this._form.group({name:this._form.control("",o.kI.required),phone:this._form.control("",o.kI.compose([o.kI.pattern(/^\d{10}$/),o.kI.minLength(10),o.kI.maxLength(10),o.kI.required])),email:this._form.control("",o.kI.compose([o.kI.required,o.kI.email])),password:this._form.control("",o.kI.compose([o.kI.required])),confirm_password:this._form.control("",o.kI.required)},{validators:[(0,d.i)("password","confirm_password")]})}navigateToLogin(){this._router.navigate(["auth/login.password"])}passwordMatchValidator(i){const s=i.get("password")?.value,t=i.get("confirm_password")?.value;return s!==t}registerSubmit(){this.registerForm.valid&&(this.passwordMatchValidator(this.registerForm)||(this.registerSubscription=this._authService.registerUser(this.registerForm.value).subscribe(i=>{"success"===i?this._router.navigate(["auth/login.password"]):(this._toaster.success("User already exists!!"),this.isError=!0)})))}ngOnDestroy(){this.registerSubscription&&this.registerSubscription.unsubscribe()}static#e=this.\u0275fac=function(s){return new(s||r)(e.Y36(l.F0),e.Y36(o.qu),e.Y36(c.e),e.Y36(g._W))};static#r=this.\u0275cmp=e.Xpm({type:r,selectors:[["app-register"]],decls:41,vars:12,consts:[[1,"flex","flex-col","justify-center","md:justify-start","my-auto","md:pt-0","px-8","md:px-24","lg:px-32"],[1,"text-center","text-3xl"],[1,"flex","flex-col","md:pt-8",3,"formGroup","submit"],[1,"flex","flex-col","pt-1"],["for","name",1,"text-lg"],["type","text","id","name","formControlName","name","placeholder","John Smith",1,"shadow","appearance-none","border","rounded","w-full","py-2","px-3","text-gray-700","mt-1","leading-tight","focus:outline-none","focus:shadow-outline"],["class","text-danger text-center ps-2 pt-2 col-12",4,"ngIf"],["for","phone",1,"text-lg"],["type","number","id","phone","formControlName","phone","placeholder","Contact Number",1,"shadow","appearance-none","border","rounded","w-full","py-2","px-3","text-gray-700","mt-1","leading-tight","focus:outline-none","focus:shadow-outline"],["class","text-danger text-center ps-2 pt-2 ",4,"ngIf"],["for","email",1,"text-lg"],["type","email","id","email","formControlName","email","placeholder","your@email.com",1,"shadow","appearance-none","border","rounded","w-full","py-2","px-3","text-gray-700","mt-1","leading-tight","focus:outline-none","focus:shadow-outline"],["for","password",1,"text-lg"],["type","password","id","password","formControlName","password","placeholder","Password",1,"shadow","appearance-none","border","rounded","w-full","py-2","px-3","text-gray-700","mt-1","leading-tight","focus:outline-none","focus:shadow-outline"],["for","confirm-password",1,"text-lg"],["type","password","id","confirm-password","formControlName","confirm_password","placeholder","Password",1,"shadow","appearance-none","border","rounded","w-full","py-2","px-3","text-gray-700","mt-1","leading-tight","focus:outline-none","focus:shadow-outline"],["type","submit","value","Register",1,"bg-black","text-white","font-bold","text-lg","hover:bg-gray-700","p-2","mt-2","rounded"],["class","text-center text-red-950",4,"ngIf"],[1,"text-center","pt-6","pb-12"],[1,"underline","font-semibold",3,"click"],[1,"text-danger","text-center","ps-2","pt-2","col-12"],[1,"text-danger","text-center","ps-2","pt-2"],[1,"text-center","text-red-950"]],template:function(s,t){if(1&s&&(e.TgZ(0,"div",0)(1,"p",1),e._uU(2,"Join Us."),e.qZA(),e.TgZ(3,"form",2),e.NdJ("submit",function(){return t.registerSubmit()}),e.TgZ(4,"div",3)(5,"label",4),e._uU(6,"Name"),e.qZA(),e._UZ(7,"input",5),e.YNc(8,f,2,0,"span",6),e.qZA(),e.TgZ(9,"div",3)(10,"label",7),e._uU(11,"Contact number"),e.qZA(),e._UZ(12,"input",8),e.YNc(13,h,2,0,"span",9),e.YNc(14,_,2,0,"span",9),e.YNc(15,w,2,0,"span",9),e.YNc(16,Z,2,0,"span",9),e.qZA(),e.TgZ(17,"div",3)(18,"label",10),e._uU(19,"Email"),e.qZA(),e._UZ(20,"input",11),e.YNc(21,x,2,0,"span",9),e.YNc(22,y,2,0,"span",9),e.qZA(),e.TgZ(23,"div",3)(24,"label",12),e._uU(25,"Password"),e.qZA(),e._UZ(26,"input",13),e.YNc(27,T,2,0,"span",9),e.qZA(),e.TgZ(28,"div",3)(29,"label",14),e._uU(30,"Confirm Password"),e.qZA(),e._UZ(31,"input",15),e.YNc(32,v,2,0,"span",9),e.YNc(33,q,2,0,"span",9),e.qZA(),e._UZ(34,"input",16),e.YNc(35,b,2,0,"span",17),e.qZA(),e.TgZ(36,"div",18)(37,"p"),e._uU(38,"Already have an account? "),e.TgZ(39,"a",19),e.NdJ("click",function(){return t.navigateToLogin()}),e._uU(40,"Log in here."),e.qZA()()()()),2&s){let p;e.xp6(3),e.Q6J("formGroup",t.registerForm),e.xp6(5),e.Q6J("ngIf",t.registerForm.hasError("required","name")&&t.registerForm.controls.name.dirty),e.xp6(5),e.Q6J("ngIf",t.registerForm.hasError("required","phone")&&t.registerForm.controls.phone.dirty),e.xp6(1),e.Q6J("ngIf",t.registerForm.hasError("pattern","phone")&&t.registerForm.controls.phone.dirty),e.xp6(1),e.Q6J("ngIf",t.registerForm.hasError("minLength","phone")&&t.registerForm.controls.phone.dirty),e.xp6(1),e.Q6J("ngIf",t.registerForm.hasError("maxLength","phone")&&t.registerForm.controls.phone.dirty),e.xp6(5),e.Q6J("ngIf",t.registerForm.hasError("required","email")&&t.registerForm.controls.email.dirty),e.xp6(1),e.Q6J("ngIf",t.registerForm.hasError("email","email")&&t.registerForm.controls.email.dirty),e.xp6(5),e.Q6J("ngIf",t.registerForm.hasError("required","password")&&t.registerForm.controls.password.dirty),e.xp6(5),e.Q6J("ngIf",null==(p=t.registerForm.get("confirm_password"))?null:p.hasError("confirmPasswordValidator")),e.xp6(1),e.Q6J("ngIf",t.registerForm.hasError("required","confirm_password")&&t.registerForm.controls.confirm_password.dirty),e.xp6(2),e.Q6J("ngIf",t.isError)}},dependencies:[u.O5,o._Y,o.Fj,o.wV,o.JJ,o.JL,o.sg,o.u]})}return r})()}];let F=(()=>{class r{static#e=this.\u0275fac=function(s){return new(s||r)};static#r=this.\u0275mod=e.oAB({type:r});static#t=this.\u0275inj=e.cJS({imports:[l.Bz.forChild(U),l.Bz]})}return r})(),A=(()=>{class r{static#e=this.\u0275fac=function(s){return new(s||r)};static#r=this.\u0275mod=e.oAB({type:r});static#t=this.\u0275inj=e.cJS({imports:[u.ez,F,o.u5,o.UX]})}return r})()}}]);