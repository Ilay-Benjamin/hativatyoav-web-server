"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectInstance = exports.ProjectAppCoreUtils = exports.ProjectAppCore = exports.ProjectBasics = void 0;
const application_1 = require("./application");
class ProjectBasics {
    initialize() {
        this.name = "";
        this.description = "";
    }
    constructor(name, description = "") {
        this.initialize();
        this.name = name;
        this.description = description;
    }
    static isProject(obj) { return (obj instanceof ProjectBasics); }
    toString() { return `Project: ${this.name}, Description: ${this.description}`; }
    isEquals(project) { return this.name === project.name && this.description === project.description; }
}
exports.ProjectBasics = ProjectBasics;
class ProjectAppCore extends ProjectBasics {
    initialize() {
        this.defualtApp = null;
        this.apps = [];
    }
    build(apps, defaultApp = null) {
        this.initialize();
        if (apps.length === 0) {
            return false;
        }
        else if (apps.reduce((acc, app) => acc || apps.filter(cApp => cApp.getName() === app.getName()).length > 1, false)) {
            return false;
        }
        else {
            this.apps = [...Array.from(apps)];
        }
        if (defaultApp === null) {
            return true;
        }
        else if (!(defaultApp instanceof application_1.ApplicationBasics) || !apps.includes(defaultApp)) {
            return false;
        }
        this.defualtApp = defaultApp;
        return true;
    }
    constructor(name, description = "") {
        super(name, description);
        this.defualtApp = null;
        this.apps = [];
        this.initialize();
    }
    addApp(app) {
        var appRef = this.apps.find(cApp => cApp.getName() === app.getName());
        if (appRef) {
            return null;
        }
        this.apps.push(app);
        return app;
    }
    removeApp(app) {
        var appRef = (this.apps.find(cApp => cApp.getName() === app.getName())) || null;
        if (appRef === null) {
            return null;
        }
        this.apps = this.apps.filter(cApp => cApp.getName() !== appRef.getName());
        return appRef;
    }
    getApp(app) { return this.apps.find(cApp => cApp.getName() === app.getName()); }
    getAppIndex(app) { return this.apps.indexOf(app); }
    isEmtpy() { return this.apps.length <= 0; }
    hasDefaultApp() { return this.defualtApp !== null; }
    appCount() { return this.apps.length; }
    hasApp(app) { return this.apps.includes(app); }
    isEquals(project) { return super.isEquals(project) && this.apps.length === project.apps.length && this.apps.reduce((acc, app) => acc && project.apps.includes(app), true); }
    toString() { return `${super.toString()}, Apps: ${this.apps}, Default App: ${this.defualtApp}`; }
}
exports.ProjectAppCore = ProjectAppCore;
class ProjectAppCoreUtils extends ProjectAppCore {
    constructor(name, description = "") {
        super(name, description);
    }
    includesApp(app) {
        return this.apps.includes(app);
    }
    hasSameApp(app) {
        return this.apps.includes(app);
    }
    setDefaultApp(defualtApp) { this.defualtApp = (!defualtApp || !this.apps.includes(defualtApp)) ? null : defualtApp; }
    getDefaultApp() { return this.defualtApp; }
    getApps() { return this.apps; }
    getAppByName(appName) { return super.getApp(this.apps.find(app => app.getName() === appName)); }
    removeAppByName(appName) { return super.removeApp(this.apps.find(app => app.getName() === appName)); }
    hasAppByName(appName) { return super.hasApp(this.apps.find(app => app.getName() === appName)); }
    getAppIndexByName(appName) { return super.getAppIndex(this.apps.find(app => app.getName() === appName)); }
    contactApps(apps) {
        apps.map(app => this.addApp(app));
    }
    clearApps() {
        super.initialize();
    }
}
exports.ProjectAppCoreUtils = ProjectAppCoreUtils;
class ProjectInstance extends ProjectAppCoreUtils {
    constructor(name, description = "") {
        super(name, description);
        this.lastIndex = 0;
    }
    load() {
        if (this.isEmtpy()) {
            return false;
        }
        this.apps.map((app) => {
            var appIndex = this.generateIndex();
            var appId = this.generateId(app.getName(), appIndex);
            app.assign(this, appId, appIndex);
        });
    }
    unload() {
        this.apps.map((app) => {
            app.unassign();
        });
    }
    build(apps, defaultApp = null) {
        const result = super.build(apps, defaultApp);
        if (!result) {
            return false;
        }
        this.load();
        return result;
    }
    generateId(appName, appIndex) {
        return `${this.name}-${appName}-${appIndex}`;
    }
    generateIndex() {
        this.lastIndex = this.lastIndex + 1;
        var index = this.lastIndex;
        return index;
    }
    getLastIndex() { return this.lastIndex; }
    addApp(app) {
        var res = super.addApp(app);
        if (!res) {
            if (res === null) {
                return null;
            }
        }
        var appIndex = this.generateIndex();
        var appId = this.generateId(app.getName(), appIndex);
        app.assign(this, appId, appIndex);
        return res;
    }
    removeApp(app) {
        var appRef = super.removeApp(app);
        if (appRef !== null) {
            appRef.unassign();
        }
        return appRef;
    }
    getAppIndexByName(appName) {
        return this.apps.find(cApp => appName === cApp.getName()).getIndex();
    }
    getAppIdByName(appName) {
        return this.apps.find(cApp => appName === cApp.getName()).getId();
    }
    getAppById(appId) {
        return this.apps.find(cApp => cApp.getId() === appId);
    }
    getAppIndexById(appId) {
        return (this.apps.find(cApp => cApp.getId() === appId).getIndex()) || null;
    }
}
exports.ProjectInstance = ProjectInstance;
