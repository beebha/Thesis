__author__ = 'bharathi'

# We are first importing from the pattern library and csv
import csv, datetime, cStringIO, codecs
from pattern.web import URL, DOM, plaintext

class UnicodeWriter:

    """
    A CSV writer which will write rows to CSV file "f",
    which is encoded in the given encoding.
    """

    def __init__(self, f, dialect=csv.excel, encoding="utf-8", **kwds):
        # Redirect output to a queue
        self.queue = cStringIO.StringIO()
        self.writer = csv.writer(self.queue, dialect=dialect, **kwds)
        self.stream = f
        self.encoder = codecs.getincrementalencoder(encoding)()

    def writerow(self, row):
        self.writer.writerow([s.encode("utf-8") for s in row])
        # Fetch UTF-8 output from the queue ...
        data = self.queue.getvalue()
        data = data.decode("utf-8")
        # ... and reencode it into the target encoding
        data = self.encoder.encode(data)
        # write to the target stream
        self.stream.write(data)
        # empty queue
        self.queue.truncate(0)

    def writerows(self, rows):
        for row in rows:
            self.writerow(row)

# Creating the csv output file for writing into as well as defining the writer
timestamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
output = open("output/digital_media_arts_and_instructional_design_requirements_"+timestamp+".csv", "wb")
writer = UnicodeWriter(output)

# Get the DOM object.
url = URL("http://dceweb.harvard.edu/prod/sswcpgm.taf?function=search&wgrp=ALMIT&_UserReference=E11F5775BEB5C7554DDE88C4&concentrationArea=AREA_CONC_5%2C6&SEARCH_TERM=both")
dom = DOM(url.download(cached=True))

# add 1st header row
writer.writerow(["Term", "CourseNumber", "Title", "Instructor", "Day", "Time", "Location", "CourseType", "EnrollLimit", "Attributes"])

date_to_write = []

# get main content containing all the courses
main_content = dom.by_class("csearchresults")

# get all the rows that have the course data
all_data_rows = main_content[0].by_tag("tr")

# loop through each row
for ind_data_row in all_data_rows:

    if ind_data_row.attributes.get("class", "") == "" or ind_data_row.attributes.get("class", "") == "odd":

        all_columns = ind_data_row.by_tag("td")

        # ensure course is not cancelled
        if len(all_columns) > 1 and plaintext(str(all_columns[4])).find("Canceled") == -1:

            term = ""
            course_number = ""
            title = ""
            instructor = ""
            day = "N/A"
            time = "N/A"
            location = "N/A"
            course_type = ""
            enroll_limit = ""
            attributes = ""

            for i in range(len(all_columns)):

                ind_column = plaintext(str(all_columns[i]))

                # column 1 - Term
                # column 3 - Course Number
                # column 5 - Title & Instructor
                # column 6 - Day & Time
                # column 7 - Location
                # column 8 - Type
                # column 10 - Enroll Limit
                # column 13 - Attributes

                if i == 0:
                    if ind_column.find("Spring") != -1:
                        term = ind_column + " 2014"
                    elif ind_column.find("Fall") != -1:
                        term = ind_column + " 2013"
                    elif ind_column.find("January") != -1:
                        term = ind_column.replace("Session", "").strip() + " 2014"
                    else:
                        term = ind_column.replace("Archive", "").strip()

                if i == 2:
                    course_number = plaintext(str(all_columns[i]).replace("<br />", ""))

                if i == 4:
                    title_instructor_info = str(all_columns[i]).split("<br />")
                    title = plaintext(title_instructor_info[0])
                    if len(title_instructor_info) == 3:
                        instructor = plaintext(title_instructor_info[1] + " & " + title_instructor_info[2])
                    else:
                        instructor = plaintext(title_instructor_info[1])

                if i == 5 and len(ind_column) > 0:
                    day_time_info = str(all_columns[i]).split("<br />")
                    day = plaintext(day_time_info[0])
                    time = plaintext(day_time_info[1])

                if i == 6 and len(ind_column) > 0:
                    location = ind_column

                if i == 7:
                    course_type = ind_column

                if i == 9:
                    enroll_limit = ind_column

                if i == 12:
                    attributes = plaintext(str(all_columns[i]).replace(", &#8224;", ""))

            date_to_write.append([term, course_number, title, instructor, day, time, location, course_type, enroll_limit, attributes])

# at this point we have all the movie rows required, print them out to the CSV file
writer.writerows(date_to_write)

# close the CSV file
output.close()





