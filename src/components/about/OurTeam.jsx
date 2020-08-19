import React from "react";
import { TEAM_DATA } from "../common/teamData";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function OurTeam() {
  const { t } = useTranslation();

  return (
    <Container className="ourTeamContainer">
      <h1 className="ourTeamTitle">{t("about.team")}</h1>
      <Row className="ourTeamRow">
        {TEAM_DATA.map((member, index) => {
          return (
            <Col key={index} xs={8} md={5} lg={3} className="teamMember">
              <img src={member.image} alt="member" />
              <h4>{member.name}</h4>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
