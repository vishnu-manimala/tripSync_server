"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[82],{82:(T,g,l)=>{l.r(g),l.d(g,{RidesModule:()=>b});var o=l(6814),s=l(1730),p=l(553),t=l(9468),u=l(8486);function h(i,n){if(1&i&&(t.TgZ(0,"ul",5)(1,"li")(2,"a",6),t._uU(3),t.qZA()()()),2&i){const e=n.index;t.xp6(3),t.hij(" ",e+1," ")}}function v(i,n){if(1&i&&(t.TgZ(0,"nav",3),t.YNc(1,h,4,1,"ul",4),t.qZA()),2&i){const e=t.oxw();t.xp6(1),t.Q6J("ngForOf",e.rideData)}}function m(i,n){if(1&i&&t._UZ(0,"img",41),2&i){const e=t.oxw().$implicit,a=t.oxw();t.Q6J("src",a.picUrl+e.vehicleDetails.userDetails.profileImage[e.vehicleDetails.userDetails.profileImage.length-1],t.LSH)}}function x(i,n){1&i&&t._UZ(0,"img",42)}function f(i,n){if(1&i){const e=t.EpF();t.TgZ(0,"article",7)(1,"div",8)(2,"a",9)(3,"div",10)(4,"div"),t.YNc(5,m,1,1,"img",11),t.YNc(6,x,1,0,"img",12),t.qZA(),t.TgZ(7,"div",13),t.NdJ("click",function(){const c=t.CHM(e).$implicit,d=t.oxw();return t.KtG(d.navigator(c.vehicleDetails.userDetails._id))}),t.TgZ(8,"p",14),t._uU(9),t.TgZ(10,"span",15),t._uU(11),t.qZA()()()()()(),t.TgZ(12,"div",16)(13,"div",17),t._UZ(14,"img",18),t.qZA(),t.TgZ(15,"div",19)(16,"span",20),t._uU(17," VEHICLE DETAILS "),t.qZA(),t.TgZ(18,"div",21),t.O4$(),t.TgZ(19,"svg",22),t._UZ(20,"path",23),t.qZA(),t.kcU(),t.TgZ(21,"span",24),t._uU(22),t.qZA()(),t.TgZ(23,"div",21),t.O4$(),t.TgZ(24,"svg",25),t._UZ(25,"path",26),t.qZA(),t.kcU(),t.TgZ(26,"span",24),t._uU(27),t.qZA()(),t.TgZ(28,"div",21),t.O4$(),t.TgZ(29,"svg",27),t._UZ(30,"path",28)(31,"path",29),t.qZA(),t.kcU(),t.TgZ(32,"span",24),t._uU(33),t.qZA()()(),t.TgZ(34,"div",19)(35,"span",30),t._uU(36," RIDE DETAILS "),t.qZA(),t.TgZ(37,"div",21),t.O4$(),t.TgZ(38,"svg",31),t._UZ(39,"path",32),t.qZA(),t.kcU(),t.TgZ(40,"span",24),t._uU(41),t.ALo(42,"uppercase"),t.qZA()(),t.TgZ(43,"div",21),t.O4$(),t.TgZ(44,"svg",33),t._UZ(45,"path",34),t.qZA(),t.kcU(),t.TgZ(46,"span",24),t._uU(47),t.ALo(48,"uppercase"),t.qZA()(),t.TgZ(49,"div",35),t.O4$(),t.TgZ(50,"svg",36),t._UZ(51,"path",37),t.qZA(),t.kcU(),t.TgZ(52,"span",24),t._uU(53),t.qZA()()(),t.TgZ(54,"div",38)(55,"button",39),t.NdJ("click",function(){const c=t.CHM(e).$implicit,d=t.oxw();return t.KtG(d.view(c._id))}),t._uU(56," view "),t.qZA()()(),t._UZ(57,"hr",40),t.qZA()}if(2&i){const e=n.$implicit,a=t.oxw();t.xp6(5),t.Q6J("ngIf",e.vehicleDetails.userDetails.profileImage),t.xp6(1),t.Q6J("ngIf",!e.vehicleDetails.userDetails.profileImage),t.xp6(3),t.hij(" ",e.vehicleDetails.userDetails.name," "),t.xp6(2),t.hij(" ",e.vehicleDetails.userDetails.email," "),t.xp6(3),t.Q6J("src",a.picUrl+e.vehicleDetails.VehiclePhotos[e.vehicleDetails.VehiclePhotos.length-1],t.LSH),t.xp6(8),t.hij("BRAND : ",e.vehicleDetails.brand,""),t.xp6(5),t.Oqu(e.vehicleDetails.model),t.xp6(6),t.hij("REG_NO : ",e.vehicleDetails.registration.registrationNumber,""),t.xp6(8),t.Oqu(t.lcZ(42,11,e.origin)),t.xp6(6),t.Oqu(t.lcZ(48,13,e.destination)),t.xp6(6),t.Oqu(e.departure_date.split("T")[0])}}function w(i,n){1&i&&(t.TgZ(0,"div")(1,"article",7)(2,"div",43)(3,"div")(4,"h1"),t._uU(5,"No rides found!!!"),t.qZA()()()()())}const Z=[{path:"",component:(()=>{class i{constructor(e,a){this._rideService=e,this._router=a,this.picUrl=p.N.picUrl}ngOnInit(){this.getData(1)}getData(e){this._rideService.getRideData(e).subscribe(a=>{"Success"===a.status&&(this.rideData=a.data,console.log("V",this.rideData))})}navigator(e){console.log("id>>",e),this._router.navigate(["/user/profile"],{queryParams:{id:e}})}view(e){this._router.navigate(["/user/search/view"],{queryParams:{id:e}})}static#t=this.\u0275fac=function(a){return new(a||i)(t.Y36(u.v),t.Y36(s.F0))};static#e=this.\u0275cmp=t.Xpm({type:i,selectors:[["app-rides"]],decls:4,vars:3,consts:[["class","mt-4",4,"ngIf"],["class","bg-white hover:bg-gray-100 mt-3 transition duration-350 ease-in-out",4,"ngFor","ngForOf"],[4,"ngIf"],[1,"mt-4"],["class","flex",4,"ngFor","ngForOf"],[1,"flex"],["href","#",1,"mx-1","flex","h-9","w-9","items-center","justify-center","rounded-full","bg-gradient-to-tr","from-pink-600","to-pink-400","p-0","text-sm","text-white","shadow-md","shadow-pink-500/20","transition","duration-150","ease-in-out"],[1,"bg-white","hover:bg-gray-100","mt-3","transition","duration-350","ease-in-out"],[1,"flex","flex-shrink-0","p-4","pb-0"],["href","#",1,"flex-shrink-0","group","block"],[1,"flex","items-center"],["class","inline-block h-10 w-10 rounded-full","alt","",3,"src",4,"ngIf"],["class","inline-block h-10 w-10 rounded-full","src","https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png","alt","",4,"ngIf"],[1,"ml-3",3,"click"],[1,"text-base","leading-6","font-medium","text-blue-950"],[1,"text-sm","leading-5","font-medium","text-gray-400","group-hover:text-gray-300","transition","ease-in-out","duration-150"],[1,"flex","flex-col","md:flex-row","justify-center","content-center","block","rounded-lg","bg-white","shadow-[0_2px_15px_-3px_rgba(0,0,0,0.09),0_10px_20px_-2px_rgba(0,0,0,0.04)]"],["data-te-ripple-init","","data-te-ripple-color","light",1,"overflow-hidden","bg-cover","bg-no-repeat","w-40","h-40","text-center"],["alt","",1,"rounded-t-lg","mt-2",3,"src"],[1,"p-6","flex","flex-col","justify-center"],[1,"mb-2","leading-tight","text-center","text-neutral-800"],[1,"bg-gray-200","w-80","p-3","m-1","rounded-xl","flex","flex-row"],["xmlns","http://www.w3.org/2000/svg","width","16","height","16","fill","currentColor","viewBox","0 0 16 16",1,"bi","bi-car-front-fill","m-1","text-blue-600"],["d","M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679c.033.161.049.325.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.807.807 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17 1.247 0 3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z"],[1,"m-1","text-gray-900"],["xmlns","http://www.w3.org/2000/svg","width","16","height","16","fill","currentColor","viewBox","0 0 16 16",1,"bi","bi-sliders","m-1","text-blue-600"],["fill-rule","evenodd","d","M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z"],["xmlns","http://www.w3.org/2000/svg","width","16","height","16","fill","currentColor","viewBox","0 0 16 16",1,"bi","bi-r-square-fill","m-1","text-blue-600"],["d","M6.835 5.092v2.777h1.549c.995 0 1.573-.463 1.573-1.36 0-.913-.596-1.417-1.537-1.417z"],["d","M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.5 4.002h3.11c1.71 0 2.741.973 2.741 2.46 0 1.138-.667 1.94-1.495 2.24L11.5 12H9.98L8.52 8.924H6.836V12H5.5z"],[1,"mb-2","leading-tight","text-neutral-800","text-center"],["xmlns","http://www.w3.org/2000/svg","width","18","height","18","fill","currentColor","viewBox","0 0 16 16",1,"bi","bi-geo-alt-fill","m-1","text-blue-600"],["d","M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"],["xmlns","http://www.w3.org/2000/svg","width","18","height","18","fill","currentColor","viewBox","0 0 16 16",1,"bi","bi-geo-fill","m-1","text-blue-600"],["fill-rule","evenodd","d","M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"],[1,"bg-gray-200","w-80","p-3","m-1","rounded-xl","flex","flex-row","justify-center"],["xmlns","http://www.w3.org/2000/svg","width","18","height","18","fill","currentColor","viewBox","0 0 16 16",1,"bi","bi-calendar-check-fill","m-1","text-blue-600"],["d","M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708z"],[1,"pr-5","flex","flex-col"],["type","submit",1,"bg-blue-600","hover:bg-gray-700","mt-5","rounded-3xl","pl-3","pr-3","pt-2","pb-2","text-white",3,"click"],[1,"border-gray-800"],["alt","",1,"inline-block","h-10","w-10","rounded-full",3,"src"],["src","https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png","alt","",1,"inline-block","h-10","w-10","rounded-full"],[1,"p-4","pb-0"]],template:function(a,r){1&a&&(t.TgZ(0,"div"),t.YNc(1,v,2,1,"nav",0),t.YNc(2,f,58,15,"article",1),t.qZA(),t.YNc(3,w,6,0,"div",2)),2&a&&(t.xp6(1),t.Q6J("ngIf",r.rideData.length>0),t.xp6(1),t.Q6J("ngForOf",r.rideData),t.xp6(1),t.Q6J("ngIf",r.rideData.length<=0))},dependencies:[o.sg,o.O5,o.gd]})}return i})()}];let _=(()=>{class i{static#t=this.\u0275fac=function(a){return new(a||i)};static#e=this.\u0275mod=t.oAB({type:i});static#i=this.\u0275inj=t.cJS({imports:[s.Bz.forChild(Z),s.Bz]})}return i})(),b=(()=>{class i{static#t=this.\u0275fac=function(a){return new(a||i)};static#e=this.\u0275mod=t.oAB({type:i});static#i=this.\u0275inj=t.cJS({imports:[o.ez,_]})}return i})()}}]);