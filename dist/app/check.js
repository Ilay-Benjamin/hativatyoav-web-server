"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = require("./models/project");
const application_1 = require("./models/application");
const landingProject = new project_1.ProjectInstance("Landing Page", "A simple landing page");
const landingProjectApplications = {
    admin: new application_1.ApplicationInstance("Admin", "Admin application for the landing page"),
    view: new application_1.ApplicationInstance("View", "View application for the landing page")
};
const landingProjectDefaultApplication = landingProjectApplications.admin;
landingProject.build(Object.values(landingProjectApplications), landingProjectDefaultApplication);
console.table((landingProject.getApps().map(app => app)));
