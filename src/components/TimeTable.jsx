import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 10,
  },
  courseContainer: {
    borderBottom: "1px solid #000",
    paddingBottom: 5,
    marginBottom: 5,
  },
  courseName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  courseDetail: {
    fontSize: 12,
  },
});

const TimetablePDF = ({ registeredCourses }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Class Schedule</Text>
      {registeredCourses.length === 0 ? (
        <Text>No courses registered.</Text>
      ) : (
        registeredCourses.map((course, index) => (
          <View key={index} style={styles.courseContainer}>
            <Text style={styles.courseName}>{course.name}</Text>
            <Text style={styles.courseDetail}>{/*{course.section} - {course.section.time}*/}</Text>
          </View>
        ))
      )}
    </Page>
  </Document>
);

export default TimetablePDF;