const express = require("express");
const db = require("./config/db");
const cors = require("cors");

const app = express();

const PORT = 3002;
app.use(cors());
app.use(express.json());

app.get("/api/get/patent_type/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM patent_type WHERE patent_type_id = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to get count_user_group
app.get("/api/get/user_group", (req, res) => {
  db.query("SELECT * FROM user_group ", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
app.get("/api/get/bb_user/:year", (req, res) => {
  const year = req.params.year;
  db.query(
    "SELECT SUM(coordinater_funding_budget)sum FROM coordinator_fundingagency WHERE YEAR(created_date) = ? ",
    year,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});
// Route to get count_user_group
app.get("/api/get/concept_proposal", (req, res) => {
  db.query("SELECT * FROM concept_proposal ", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.get("/api/get/source_funds/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM source_funds WHERE source_funds_id = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});
app.get("/api/get/source_funds", (req, res) => {
  db.query(
    "SELECT * FROM source_funds ",

    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});
app.post("/api/create/source_funds", (req, res) => {
  const source_funds_name = req.body.source_funds_name;
  // const project_id = 10;
  // const concept_proposal_id = 20;
  // const coordinater_funding_id = 10;
  // const coordinater_budgetall_id = 10;
  const created_by = "upgg";
  const created_date = req.body.created_date;
  // const updated_by = "sffs";
  // const updated_date = "2021-06-14 02:00:13";

  db.query(
    "INSERT INTO source_funds(source_funds_name,created_by,created_date) VALUES(?,?,?)",
    [
      source_funds_name,
      // project_id,
      // concept_proposal_id,
      // coordinater_funding_id,
      // coordinater_budgetall_id,
      created_by,
      created_date,
      // updated_by,
      // updated_date,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//start : coordinator_fundingagency
app.post("/api/create/coordinator_fundingagency", (req, res) => {
  const funding_project_name = req.body.funding_project_name;
  const coordinator_project = req.body.coordinator_project;
  const funding_agency = req.body.funding_agency;
  const funding_project_leader = req.body.funding_project_leader;
  const funding_phone = req.body.funding_phone;
  const funding_year = req.body.funding_year;
  const funding_budget = req.body.funding_budget;
  const funding_name = req.body.funding_name;
  const coordinator_univercity_budget = req.body.coordinator_univercity_budget;
  const funding_user_id = 10;
  const funding_created_by = "upgg";
  const funding_created_date = req.body.created_date;
  const funding_updated_by = "sffs";
  const funding_updated_date = req.body.updated_date;

  db.query(
    "INSERT INTO coordinator_fundingagency (coordinater_funding_project_name , coordinator_project,coordinater_funding_agency,project_leader,coordinater_funding_phone,coordinater_funding_year,coordinater_funding_budget,coordinater_funding_name,coordinator_univercity_budget,user_idcard,created_by,created_date,updated_by,updated_date) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      funding_project_name,
      coordinator_project,
      funding_agency,
      funding_project_leader,
      funding_phone,
      funding_year,
      funding_budget,
      funding_name,
      coordinator_univercity_budget,
      funding_user_id,
      funding_created_by,
      funding_created_date,
      funding_updated_by,
      funding_updated_date,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});
app.put("/api/update/coordinator_fundingagency/:id", (req, res) => {
  const id = req.params.id;
  const funding_project_name = req.body.funding_project_name;
  const coordinator_project = req.body.coordinator_project;
  const funding_agency = req.body.funding_agency;
  const funding_project_leader = req.body.funding_project_leader;
  const funding_phone = req.body.funding_phone;
  const funding_year = req.body.funding_year;
  const funding_budget = req.body.funding_budget;
  const funding_name = req.body.funding_name;
  const coordinator_univercity_budget = req.body.coordinator_univercity_budget;
  const funding_updated_by = "sffs";
  const funding_updated_date = req.body.update_date;
  db.query(
    "UPDATE coordinator_fundingagency SET coordinater_funding_project_name = ?, coordinator_project = ?,coordinater_funding_agency = ?,project_leader = ?,coordinater_funding_phone = ? ,coordinater_funding_year = ?,coordinater_funding_budget = ? ,coordinater_funding_name = ? ,coordinator_univercity_budget = ? ,updated_by = ? ,updated_date = ? WHERE coordinater_funding_id = ? ",
    [
      funding_project_name,
      coordinator_project,
      funding_agency,
      funding_project_leader,
      funding_phone,
      funding_year,
      funding_budget,
      funding_name,
      coordinator_univercity_budget,
      funding_updated_by,
      funding_updated_date,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});
app.delete("/api/delete/coordinator_fundingagency/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM coordinator_fundingagency WHERE coordinater_funding_id = ?  ",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});
app.get("/api/get/coordinator_fundingagency", (req, res) => {
  db.query("SELECT * FROM coordinator_fundingagency ", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
app.get("/api/get/coordinator_fundingagency/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM coordinator_fundingagency WHERE coordinater_funding_id =? ",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});
app.get("/api/get/sum_coordinater_funding_budget/:year_budget", (req, res) => {
  const year_budget = req.params.year_budget;
  db.query(
    "SELECT SUM(coordinater_funding_budget)sum FROM coordinator_fundingagency WHERE coordinater_funding_year = ? ",
    year_budget,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});
app.get("/api/get/count_coordinator_fundingagency/:year", (req, res) => {
  const year = req.params.year;
  db.query(
    "SELECT * FROM coordinator_fundingagency WHERE coordinater_funding_year = ?",
    year,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});
//end : coordinator_fundingagency

//start : coordinator_fundingagency_academic
app.post("/api/create/coordinator_fundingagency_academic", (req, res) => {
  const funding_ac_name = req.body.funding_ac_name;
  const funding_ac_project = req.body.funding_ac_project;
  const funding_ac_agency = req.body.funding_ac_agency;
  const funding_ac_leader = req.body.funding_ac_leader;
  const funding_ac_phone = req.body.funding_ac_phone;
  const funding_ac_year = req.body.funding_ac_year;
  const funding_ac_budget = req.body.funding_ac_budget;
  const funding_name = req.body.funding_name;
  const coordinator_univercity_ac_budget =
    req.body.coordinator_univercity_ac_budget;
  const funding_user_id = 10;
  const funding_created_by = "upgg";
  const funding_created_date = req.body.created_date;
  // const funding_updated_by = "sffs";
  // const funding_updated_date = req.body.updated_date;
  db.query(
    "INSERT INTO coordinator_fundingagency_academic (coordinator_fundingagency_ac_name, coordinator_ac_project,coordinater_funding_ac_agency,project_ac_leader,coordinater_funding_ac_phone ,coordinater_funding_ac_year,coordinater_funding_ac_budget,coordinater_funding_ac_name      ,coordinator_univercity_ac_budget,user_idcard,created_by,created_date) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      funding_ac_name,
      funding_ac_project,
      funding_ac_agency,
      funding_ac_leader,
      funding_ac_phone,
      funding_ac_year,
      funding_ac_budget,
      funding_name,
      coordinator_univercity_ac_budget,
      funding_user_id,
      funding_created_by,
      funding_created_date,
      // funding_updated_by,
      // funding_updated_date,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});
app.put("/api/update/coordinator_fundingagency_academic/:id", (req, res) => {
  const id = req.params.id;
  const funding_ac_name = req.body.funding_ac_name;
  const funding_ac_project = req.body.funding_ac_project;
  const funding_ac_agency = req.body.funding_ac_agency;
  const funding_ac_leader = req.body.funding_ac_leader;
  const funding_ac_phone = req.body.funding_ac_phone;
  const funding_ac_year = req.body.funding_ac_year;
  const funding_ac_budget = req.body.funding_ac_budget;
  const funding_name = req.body.funding_name;
  const coordinator_univercity_ac_budget =
    req.body.coordinator_univercity_ac_budget;
  const funding_updated_by = "sffs";
  const funding_updated_date = req.body.update_date;
  db.query(
    "UPDATE coordinator_fundingagency_academic SET coordinator_fundingagency_ac_name = ?, coordinator_ac_project= ?,coordinater_funding_ac_agency = ?,project_ac_leader= ?,coordinater_funding_ac_phone = ? ,coordinater_funding_ac_year= ?,coordinater_funding_ac_budget= ? ,coordinater_funding_ac_name= ? ,coordinator_univercity_ac_budget= ? ,updated_by = ? ,updated_date = ? WHERE coordinator_fundingagency_ac_id = ? ",
    [
      funding_ac_name,
      funding_ac_project,
      funding_ac_agency,
      funding_ac_leader,
      funding_ac_phone,
      funding_ac_year,
      funding_ac_budget,
      funding_name,
      coordinator_univercity_ac_budget,
      funding_updated_by,
      funding_updated_date,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});
app.delete("/api/delete/coordinator_fundingagency_academic/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM coordinator_fundingagency_academic WHERE coordinator_fundingagency_ac_id = ?  ",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});
app.get("/api/get/coordinator_fundingagency_academic", (req, res) => {
  db.query(
    "SELECT * FROM coordinator_fundingagency_academic ",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});
app.get("/api/get/coordinator_fundingagency_academic/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM coordinator_fundingagency_academic WHERE coordinator_fundingagency_ac_id =? ",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});
app.get(
  "/api/get/sum_coordinater_funding_budget_academic/:year_budget",
  (req, res) => {
    const year_budget = req.params.year_budget;
    db.query(
      "SELECT SUM(coordinater_funding_ac_budget)sum FROM coordinator_fundingagency_academic WHERE coordinater_funding_ac_year = ? ",
      year_budget,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        res.send(result);
      }
    );
  }
);
app.get(
  "/api/get/count_coordinator_fundingagency_academic/:year",
  (req, res) => {
    const year = req.params.year;
    db.query(
      "SELECT * FROM coordinator_fundingagency_academic WHERE coordinater_funding_ac_year = ?",
      year,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        res.send(result);
      }
    );
  }
);
//end : coordinator_fundingagency_academic

app.get("/api/get/coordinator_about_fundingagency", (req, res) => {
  db.query("SELECT * FROM coordinator_about_fundingagency ", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
app.get("/api/get/coordinator_fundingagency_project", (req, res) => {
  db.query(
    "SELECT * FROM coordinator_fundingagency_project ",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
