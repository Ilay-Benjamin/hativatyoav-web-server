import { ProjectInstance } from "./models/project";
import { ApplicationInstance } from "./models/application";



const landingProject : ProjectInstance = new ProjectInstance("Landing Page", "A simple landing page");


const landingProjectApplications : {[key: string]: ApplicationInstance} = {
     admin: new ApplicationInstance("Admin", "Admin application for the landing page"),
     view: new ApplicationInstance("View", "View application for the landing page")
}

const landingProjectDefaultApplication = landingProjectApplications.admin;



landingProject.build(Object.values(landingProjectApplications), landingProjectDefaultApplication);


console.table((landingProject.getApps().map(app => app)));