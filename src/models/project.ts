import { ApplicationBasics, ApplicationInstance } from "./application";



export class ProjectBasics {
     protected name: string;
     protected description: string;
     protected initialize() {     
          this.name = "";
          this.description = "";
     }
     constructor(name: string, description = "") {
          this.initialize();
          this.name = name;
          this.description = description;          
     }
     static isProject(obj: Object) { return (obj instanceof ProjectBasics); }
     toString() { return `Project: ${this.name}, Description: ${this.description}`; }
     isEquals(project: ProjectBasics) { return this.name === project.name && this.description === project.description; }
}



export class ProjectAppCore extends ProjectBasics {
     protected defualtApp!: null|ApplicationBasics;
     protected apps: ApplicationBasics[];
     protected initialize() {
          this.defualtApp = null;
          this.apps = [];
     }
     build(apps: ApplicationBasics[], defaultApp: null|ApplicationBasics = null) {
          this.initialize();
          if (apps.length === 0) { return false; }     
          else if (apps.reduce((acc, app: ApplicationBasics) => acc || apps.filter(cApp => cApp.getName() === app.getName()).length > 1, false)) { return false; }
          else { this.apps = [...Array.from(apps)]; }
          if ( defaultApp === null ) { return true;}
          else if (!(defaultApp instanceof ApplicationBasics) || !apps.includes(defaultApp)) { return false; }
          this.defualtApp = defaultApp;
          return true;
     }
     constructor(name: string, description = "") {
          super(name, description);
          this.defualtApp = null;
          this.apps = [];
          this.initialize();
     }
     addApp(app: ApplicationBasics) { 
          var appRef = this.apps.find(cApp => cApp.getName() === app.getName());
          if (appRef) { return null; }
          this.apps.push(app);
          return app;
     }
     removeApp(app: ApplicationBasics) { 
          var appRef : null|ApplicationBasics = (this.apps.find(cApp => cApp.getName() === app.getName())) || null;
          if (appRef === null) {
               return null;
          }
          this.apps = this.apps.filter(cApp => cApp.getName() !== appRef!.getName());
          return appRef!;
     }
     getApp(app: ApplicationBasics) { return this.apps.find(cApp => cApp.getName() === app.getName()); }
     getAppIndex(app: ApplicationBasics) { return this.apps.indexOf(app);  }
     isEmtpy() { return this.apps.length <= 0; }
     hasDefaultApp() { return this.defualtApp !== null; }
     appCount() { return this.apps.length; }
     hasApp(app: ApplicationBasics) { return this.apps.includes(app); }
     isEquals(project: ProjectAppCore) { return super.isEquals(project) && this.apps.length === project.apps.length && this.apps.reduce((acc, app) => acc && project.apps.includes(app), true); }
     toString() { return `${super.toString()}, Apps: ${this.apps}, Default App: ${this.defualtApp}`; } 
}



export class ProjectAppCoreUtils extends ProjectAppCore {
     constructor(name: string, description = "") {
          super(name, description);
     }
     includesApp(app: ApplicationBasics) {
          return this.apps.includes(app);
     }
     hasSameApp(app: ApplicationBasics) {
          return this.apps.includes(app);
     }
     setDefaultApp(defualtApp: ApplicationBasics|null) { this.defualtApp = (!defualtApp || !this.apps.includes(defualtApp)) ? null : defualtApp; }
     getDefaultApp() { return this.defualtApp; }
     getApps() { return this.apps; }
     getAppByName(appName: string) { return super.getApp(this.apps.find(app => app.getName() === appName)!); }
     removeAppByName(appName: string) { return super.removeApp(this.apps.find(app => app.getName() === appName)!); }
     hasAppByName(appName: string) { return super.hasApp(this.apps.find(app => app.getName() === appName)!); }
     getAppIndexByName(appName: string) { return super.getAppIndex(this.apps.find(app => app.getName() === appName)!); }
     contactApps(apps: ApplicationBasics[]) {
          apps.map(app => this.addApp(app));
     }
     clearApps() {
          super.initialize();
     }
}



export class ProjectInstance extends ProjectAppCoreUtils {
     protected lastIndex: number;
     constructor(name: string, description = "") {
          super(name, description);
          this.lastIndex = 0;
     }    
     protected load() {
          if ( this.isEmtpy() ) { return false; }
          this.apps.map ((app) => {      
               var appIndex = this.generateIndex();
               var appId = this.generateId(app.getName(), appIndex);
               (app as ApplicationInstance).assign(this, appId, appIndex);
          });
     }
     protected unload() {
          this.apps.map ((app) => {
               (app as ApplicationInstance).unassign();
          });
     }
     build(apps: ApplicationBasics[], defaultApp: null|ApplicationBasics = null): boolean {
          const result = super.build(apps, defaultApp);
          if (!result) { return false; }
          this.load();
          return result;
     }
     generateId(appName: string, appIndex: number) {
          return `${this.name}-${appName}-${appIndex}`;
     }
     generateIndex() {
          this.lastIndex = this.lastIndex + 1;
          var index = this.lastIndex;
          return index;
     }
     getLastIndex() { return this.lastIndex; }
     addApp(app: ApplicationBasics) {
          var res = super.addApp(app);
          if (!res) {
               if (res === null) { return null; }
          }
          var appIndex = this.generateIndex();
          var appId = this.generateId(app.getName(), appIndex);
          (app as ApplicationInstance).assign(this, appId, appIndex);
          return res;
     }
     removeApp(app: ApplicationBasics) {
          var appRef = super.removeApp(app);
          if (appRef !== null) {
               (appRef as ApplicationInstance).unassign();
          }
          return appRef;
     }
     getAppIndexByName(appName: string) {
          return (this.apps.find( cApp => appName === cApp.getName() ) as ApplicationInstance).getIndex();
     }
     getAppIdByName(appName: string) {
          return (this.apps.find(cApp => appName === cApp.getName() ) as ApplicationInstance).getId();
     }
     getAppById(appId: string) {
          return this.apps.find(cApp => (cApp as ApplicationInstance).getId() === appId);
     }
     getAppIndexById(appId: string) {
          return ((this.apps.find(cApp => (cApp as ApplicationInstance).getId() === appId) as ApplicationInstance).getIndex())||null;
     }
}


