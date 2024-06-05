"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[17],{5017:(F,p,a)=>{a.r(p),a.d(p,{BaseModule:()=>H});var l=a(9808),d=a(4521),e=a(5e3),g=a(2340),y=a(520);let v=(()=>{class o{constructor(t){this.http=t,this.root_url=g.N.api_url}getVacanciesForHome(){return this.http.get(`${this.root_url}/employee/home/vacancies/get`)}getEmployeeForHome(){return this.http.get(`${this.root_url}/employer/home/employees/get`)}}return o.\u0275fac=function(t){return new(t||o)(e.LFG(y.eN))},o.\u0275prov=e.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();var h=a(8951),x=a(5900),n=a(1777),w=a(8966),_=a(9602),u=a(7423),f=a(5245);function C(o,i){if(1&o){const t=e.EpF();e.TgZ(0,"fuse-card",2),e.NdJ("swipeleft",function(){const r=e.CHM(t).$implicit;return e.oxw().onSwipeLeft(r)})("swiperight",function(){const r=e.CHM(t).$implicit;return e.oxw().onSwipeRight(r)}),e._UZ(1,"div"),e.TgZ(2,"div",3),e._UZ(3,"img",4),e.TgZ(4,"div",5)(5,"div",6),e._uU(6),e.qZA(),e.TgZ(7,"div",7),e._uU(8),e.qZA()()(),e.TgZ(9,"div",8)(10,"div",9)(11,"div",10),e._uU(12),e.qZA(),e.TgZ(13,"div",10),e._uU(14),e.qZA(),e.TgZ(15,"div",10),e._uU(16),e.qZA()(),e.TgZ(17,"div",11)(18,"button",12),e._UZ(19,"mat-icon",13),e.qZA()(),e.TgZ(20,"div",14)(21,"button",15),e._UZ(22,"mat-icon",16),e.qZA()()(),e.TgZ(23,"div",17)(24,"button",18),e.NdJ("click",function(){const r=e.CHM(t).$implicit;return e.oxw().viewVacancy(r)}),e._uU(25," Read More "),e._UZ(26,"mat-icon",19),e.qZA()()()}if(2&o){const t=i.$implicit;e.xp6(1),e.Gre("background-overlay ","swipe-right"===(null==t?null:t.swipe_state)?"bg-green-200":"swipe-left"===(null==t?null:t.swipe_state)?"bg-red-200":"",""),e.Q6J("@swipeAnimation",null==t?null:t.swipe_state),e.xp6(2),e.Q6J("src",t.company_logo?t.company_logo:"assets/images/avatars/male-04.jpg",e.LSH),e.xp6(3),e.hij(" ",t.job_name," "),e.xp6(2),e.AsE(" ",t.company_name,", ",t.company_location," "),e.xp6(4),e.hij(" ",t.company_location," "),e.xp6(2),e.hij(" ",t.salary_range," "),e.xp6(2),e.hij(" ",t.placement_type," "),e.xp6(3),e.Q6J("svgIcon","heroicons_solid:check-circle"),e.xp6(3),e.Q6J("svgIcon","heroicons_solid:x-circle")}}let b=(()=>{class o{constructor(t){this.mat_dialog=t}ngOnInit(){}viewVacancy(t){this.mat_dialog.open(x.M,{disableClose:!0,data:{vacancy_id:t.vacancy_id},width:"640px"})}onSwipeLeft(t){console.log(t+"left"),t.swipe_state="swipe-left",setTimeout(()=>t.swipe_state="inactive",1e3)}onSwipeRight(t){console.log(t+"right"),t.swipe_state="swipe-right",setTimeout(()=>t.swipe_state="inactive",1e3)}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(w.uw))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-vacancy-card"]],inputs:{vacancies:"vacancies"},decls:2,vars:1,consts:[[1,"flex","flex-col","md:flex-row","w-full","px-14","py-4"],["class","flex flex-col max-w-80 w-full p-8 pb-4 filter-article mr-6",3,"swipeleft","swiperight",4,"ngFor","ngForOf"],[1,"flex","flex-col","max-w-80","w-full","p-8","pb-4","filter-article","mr-6",3,"swipeleft","swiperight"],[1,"flex","items-center"],["alt","Card cover image",1,"w-20","rounded-lg","object-cover",3,"src"],[1,"flex","flex-col","ml-6"],[1,"text-2xl","font-semibold","leading-tight"],[1,"text-secondary","font-medium","text-md"],[1,"flex","items-center","justify-between"],[1,"mt-6","flex","flex-col"],[1,"text-secondary","font-medium","text-sm"],[1,"flex","items-center","justify-center","w-10","h-10","border","rounded-full","hover:bg-green-100/10","ease-in-out"],["mat-icon-button",""],[1,"icon-size-5","text-green-300",3,"svgIcon"],[1,"flex","items-center","justify-center","w-10","h-10","border","rounded-full"],["mat-icon-button","","color","warn"],[1,"icon-size-5",3,"svgIcon"],[1,"flex","justify-center"],["mat-button","",1,"text-sm","hover:bg-slate-500","ease-in-out",3,"click"],["svgIcon","mat_solid:expand_more",1,"icon-size-6"]],template:function(t,c){1&t&&(e.TgZ(0,"div",0),e.YNc(1,C,27,13,"fuse-card",1),e.qZA()),2&t&&(e.xp6(1),e.Q6J("ngForOf",c.vacancies))},directives:[l.sg,_.y,u.lW,f.Hw],styles:[".background-overlay[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;z-index:100;transition:opacity 1s ease,width 1s ease,background-color 1s ease}"],data:{animation:[(0,n.X$)("swipeAnimation",[(0,n.SB)("inactive",(0,n.oB)({transform:"translateX(0)",opacity:0})),(0,n.SB)("swipeRight",(0,n.oB)({transform:"translateX(100%)",opacity:1,backgroundColor:"green"})),(0,n.SB)("swipeLeft",(0,n.oB)({transform:"translateX(-100%)",opacity:1,backgroundColor:"red"})),(0,n.eR)("inactive => swipeRight",[(0,n.jt)("1s ease-in-out")]),(0,n.eR)("swipeRight => inactive",[(0,n.jt)("1s ease-in-out")]),(0,n.eR)("inactive => swipeLeft",[(0,n.jt)("1s ease-in-out")]),(0,n.eR)("swipeLeft => inactive",[(0,n.jt)("1s ease-in-out")])])]}}),o})();function Z(o,i){if(1&o&&e._UZ(0,"img",22),2&o){const t=e.oxw().$implicit;e.Q6J("src",t.cover_url,e.LSH)}}function j(o,i){1&o&&e._UZ(0,"div",23)}function T(o,i){if(1&o){const t=e.EpF();e.TgZ(0,"fuse-card",2),e.NdJ("swipeleft",function(){const r=e.CHM(t).$implicit;return e.oxw().onSwipeLeft(r)})("swiperight",function(){const r=e.CHM(t).$implicit;return e.oxw().onSwipeRight(r)}),e._UZ(1,"div"),e.TgZ(2,"div",3),e.YNc(3,Z,1,1,"img",4),e.YNc(4,j,1,0,"ng-template",null,5,e.W1O),e.qZA(),e.TgZ(6,"div",6)(7,"div",7),e._UZ(8,"img",8),e.qZA()(),e.TgZ(9,"div",9)(10,"div",10)(11,"div",11)(12,"div",12),e._uU(13),e.qZA(),e.TgZ(14,"div",13),e._uU(15),e.qZA()(),e.TgZ(16,"div",14)(17,"button",15),e._UZ(18,"mat-icon",16),e.qZA()(),e.TgZ(19,"div",17)(20,"button",18),e._UZ(21,"mat-icon",19),e.qZA()()(),e._UZ(22,"hr",20),e.TgZ(23,"div",10)(24,"div",21),e._uU(25),e.qZA()()()()}if(2&o){const t=i.$implicit,c=e.MAs(5);e.xp6(1),e.Gre("background-overlay ","swipe-right"===(null==t?null:t.swipe_state)?"bg-green-200":"swipe-left"===(null==t?null:t.swipe_state)?"bg-red-200":"",""),e.Q6J("@swipeAnimation",null==t?null:t.swipe_state),e.xp6(2),e.Q6J("ngIf",t.cover_url)("ngIfElse",c),e.xp6(5),e.Q6J("src",t.profile_url?t.profile_url:"assets/images/avatars/male-04.jpg",e.LSH),e.xp6(5),e.hij(" ",t.name," "),e.xp6(2),e.hij(" ",t.country_name," "),e.xp6(3),e.Q6J("svgIcon","heroicons_solid:check-circle"),e.xp6(3),e.Q6J("svgIcon","heroicons_solid:x-circle"),e.xp6(4),e.hij(" ",t.job_name," ")}}let S=(()=>{class o{constructor(){}ngOnInit(){}onSwipeLeft(t){t.swipe_state="swipe-left",setTimeout(()=>t.swipe_state="inactive",1e3)}onSwipeRight(t){t.swipe_state="swipe-right",setTimeout(()=>t.swipe_state="inactive",1e3)}}return o.\u0275fac=function(t){return new(t||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-employee-card"]],inputs:{employees:"employees"},decls:2,vars:1,consts:[[1,"flex","flex-col","md:flex-row","w-full","px-14","py-4"],["class","flex flex-col max-w-80 w-full filter-info mr-6",3,"swipeleft","swiperight",4,"ngFor","ngForOf"],[1,"flex","flex-col","max-w-80","w-full","filter-info","mr-6",3,"swipeleft","swiperight"],[1,"flex","h-32"],["class","object-cover","alt","Card cover image",3,"src",4,"ngIf","ngIfElse"],["elseCover",""],[1,"flex","px-8"],[1,"p-1","bg-card","rounded-full","-mt-12"],["alt","Card cover image",1,"w-24","h-24","rounded-full",3,"src"],[1,"flex","flex-col","px-8","pt-4","pb-6"],[1,"flex","items-center","justify-between"],[1,"mr-4"],[1,"text-2xl","font-semibold","leading-tight"],[1,"text-secondary","leading-tight","mt-1"],[1,"flex","items-center","justify-center","w-10","h-10","border","rounded-full","hover:bg-green-100/10","ease-in-out"],["mat-icon-button",""],[1,"icon-size-5","text-green-300",3,"svgIcon"],[1,"flex","items-center","justify-center","w-10","h-10","border","rounded-full"],["mat-icon-button","","color","warn"],[1,"icon-size-5",3,"svgIcon"],[1,"w-full","border-t","my-6"],[1,"text-md","font-medium","text-secondary","mr-3"],["alt","Card cover image",1,"object-cover",3,"src"],[1,"bg-white","w-full"]],template:function(t,c){1&t&&(e.TgZ(0,"div",0),e.YNc(1,T,26,12,"fuse-card",1),e.qZA()),2&t&&(e.xp6(1),e.Q6J("ngForOf",c.employees))},directives:[l.sg,_.y,l.O5,u.lW,f.Hw],styles:[".background-overlay[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;z-index:100;transition:opacity 1s ease,width 1s ease,background-color 1s ease}"],data:{animation:[(0,n.X$)("swipeAnimation",[(0,n.SB)("inactive",(0,n.oB)({transform:"translateX(0)",opacity:0})),(0,n.SB)("swipeRight",(0,n.oB)({transform:"translateX(100%)",opacity:1,backgroundColor:"green"})),(0,n.SB)("swipeLeft",(0,n.oB)({transform:"translateX(-100%)",opacity:1,backgroundColor:"red"})),(0,n.eR)("inactive => swipeRight",[(0,n.jt)("1s ease-in-out")]),(0,n.eR)("swipeRight => inactive",[(0,n.jt)("1s ease-in-out")]),(0,n.eR)("inactive => swipeLeft",[(0,n.jt)("1s ease-in-out")]),(0,n.eR)("swipeLeft => inactive",[(0,n.jt)("1s ease-in-out")])])]}}),o})();function J(o,i){if(1&o&&(e.ynx(0),e._UZ(1,"app-vacancy-card",3),e.BQk()),2&o){const t=e.oxw();e.xp6(1),e.Q6J("vacancies",t.home_data)}}function A(o,i){if(1&o&&e._UZ(0,"app-employee-card",4),2&o){const t=e.oxw();e.Q6J("employees",t.home_data)}}const U=[{path:"home",component:(()=>{class o{constructor(t,c){this.home_service=t,this.auth_service=c}ngOnInit(){this.user_type=this.auth_service.userType,this.home_data=[],1===this.user_type?this.home_service.getVacanciesForHome().subscribe({next:t=>{console.log(t),this.home_data=t.data},error:t=>{console.log(t),this.home_data=[{vacancy_id:1,job_id:1,job_name:"Software Engineer",employment_type_id:1,placement_type:"Full-Time",location:"Kochi",salary_range:"20000/- to 35000/-",employer_info_id:1,company_name:"Company Name",company_location:"Location",company_logo:""},{vacancy_id:1,job_id:1,job_name:"Software Engineer",employment_type_id:1,placement_type:"Full-Time",location:"Kochi",salary_range:"20000/- to 35000/-",employer_info_id:1,company_name:"Company Name",company_location:"Location",company_logo:""},{vacancy_id:1,job_id:1,job_name:"Software Engineer",employment_type_id:1,placement_type:"Full-Time",location:"Kochi",salary_range:"20000/- to 35000/-",employer_info_id:1,company_name:"Company Name",company_location:"Location",company_logo:""},{vacancy_id:1,job_id:1,job_name:"Software Engineer",employment_type_id:1,placement_type:"Full-Time",location:"Kochi",salary_range:"20000/- to 35000/-",employer_info_id:1,company_name:"Company Name",company_location:"Location",company_logo:""}]}}):this.home_service.getEmployeeForHome().subscribe({next:t=>{console.log(t),this.home_data=t.data},error:t=>{console.log(t),this.home_data=[{vacancy_id:1,personal_info_id:1,name:"Jacob John",email:"",phone_number:"",profile_url:"",cover_url:"",job_id:1,job_name:"Software Engineer",resume_attachment_id:1,country_id:1,country_name:"United Kingdom"},{vacancy_id:1,personal_info_id:1,name:"Jacob John",email:"",phone_number:"",profile_url:"",cover_url:"",job_id:1,job_name:"Software Engineer",resume_attachment_id:1,country_id:1,country_name:"United Kingdom"},{vacancy_id:1,personal_info_id:1,name:"Jacob John",email:"",phone_number:"",profile_url:"",cover_url:"",job_id:1,job_name:"Software Engineer",resume_attachment_id:1,country_id:1,country_name:"United Kingdom"},{vacancy_id:1,personal_info_id:1,name:"Jacob John",email:"",phone_number:"",profile_url:"",cover_url:"",job_id:1,job_name:"Software Engineer",resume_attachment_id:1,country_id:1,country_name:"United Kingdom"}]}})}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(v),e.Y36(h.e))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-home"]],decls:4,vars:2,consts:[[1,"flex","flex-col","w-full","p-4"],[4,"ngIf","ngIfElse"],["employeeCard",""],[3,"vacancies"],[3,"employees"]],template:function(t,c){if(1&t&&(e.TgZ(0,"div",0),e.YNc(1,J,2,1,"ng-container",1),e.YNc(2,A,1,1,"ng-template",null,2,e.W1O),e.qZA()),2&t){const s=e.MAs(3);e.xp6(1),e.Q6J("ngIf",1===c.user_type)("ngIfElse",s)}},directives:[l.O5,b,S],styles:[""]}),o})()}];let E=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[d.Bz.forChild(U)],d.Bz]}),o})();var B=a(2805);let H=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[l.ez,E,B.m]]}),o})()}}]);