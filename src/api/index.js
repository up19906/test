import http from "./http-common";

class ApiData {
  //Home
  getusergroup() {
    return http.get("/get/user_group");
  }
  getconcept_proposal() {
    return http.get("/get/concept_proposal");
  }
  getcoordinater_funding_budgetByYear(date) {
    return http.get(`/get/sum_coordinater_funding_budget/${date}`);
  }
  getcoordinater_funding_budget_academicByYear(date) {
    return http.get(`/get/sum_coordinater_funding_budget_academic/${date}`);
  }
  getcount_coordinater_fundingByYear(date) {
    return http.get(`/get/count_coordinator_fundingagency/${date}`);
  }
  getcount_coordinater_funding_academicByYear(date) {
    return http.get(`/get/count_coordinator_fundingagency_academic/${date}`);
  }

  //Funding
  getcodinator_funding() {
    return http.get("/get/coordinator_fundingagency");
  }

  getconcept_proposal_research_facultys() {
    return http.get("/get/concept_proposal_research_facultys");
  }

  getsource_funds() {
    return http.get("/get/source_funds");
  }

  getproject_type() {
    return http.get("/get/project-type");
  }

  getresearch_faculty() {
    return http.get("/get/concept_proposal_research_facultys");
  }

  getbudget_type() {
    return http.get("/get/coordinator_budget_type");
  }

  getfunding_status() {
    return http.get("/get/coordinator_fundingagency_status");
  }

  created_funding(data) {
    return http.post("/create/coordinator_fundingagency", data);
  }

  createsource_funds(data) {
    return http.post("/create/source_funds", data);
  }

  //concept_proposol
  create_concept(data) {
    return http.post("/create/concept_proposal", data);
  }

  get_co_research_group() {
    return http.get("/get/co-researcher-group");
  }
  
  create_co_research(data) {
    return http.post("/create/co-researcher", data);
  }

  // bb_user
  getuser() {
    return http.get("/get/bb-user");
  }

  createabout_funding(data) {
    return http.post("/post/coordinator_about_fundingagency", data);
  }

  getAll() {
    return http.get("/tutorials");
  }

  get(id) {
    return http.get(`/tutorials/${id}`);
  }

  create(data) {
    return http.post("/tutorials", data);
  }

  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new ApiData();
