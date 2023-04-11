import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import SchoolIcon from "@material-ui/icons/School";
import WorkIcon from "@material-ui/icons/Work";

function Experience() {
  return (
    <div className="experience">
      <VerticalTimeline lineColor="#3e497a">
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="2016 - 2021"
          iconStyle={{ background: "#3e497a", color: "#fff" }}
          icon={<SchoolIcon />}
        >
          <h3 className="vertical-timeline-element-title">
            EMITS Program in Highschool
          </h3>
          <p>(Enriched Mathematics Information Technology & Science)</p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="August 2022 - 2025"
          iconStyle={{ background: "#3e497a", color: "#fff" }}
          icon={<SchoolIcon />}
        >
          <h3 className="vertical-timeline-element-title">
            LaTrobe University
          </h3>

          <h4 className="vertical-timeline-element-subtitle">
            Bachelor's Degree
          </h4>

          <p>Applied Information Technology</p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="January 2023 - Present"
          iconStyle={{ background: "#e9d35b", color: "#fff" }}
          icon={<WorkIcon />}
        >
          <h3 className="vertical-timeline-element-title">
            Software Developer
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            Valearnis (Tech start-up)
          </h4>
          <p>Django, React and Postgres</p>
        </VerticalTimelineElement>

        {/* <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2020 - present"
          iconStyle={{ background: "#e9d35b", color: "#fff" }}
          icon={<WorkIcon />}
        >
          <h3 className="vertical-timeline-element-title">
            Internship
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            Software Engineer
          </h4>
          <p>
            My goal.
          </p>
        </VerticalTimelineElement> */}
      </VerticalTimeline>
    </div>
  );
}

export default Experience;
