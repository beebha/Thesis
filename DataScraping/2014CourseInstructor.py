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
output = open("output/instructors_"+timestamp+".csv", "wb")
writer = UnicodeWriter(output)

# add 1st header row
writer.writerow(["CourseID", "InstructorCode", "InstructorName", "InstructorURL", "InstructorEmail"])

date_to_write = []

all_urls = ["http://dceweb.harvard.edu/prod/sswcpgm.taf?function=search&wgrp=ALMIT&_UserReference=E11F5775BEB5C7554DDE88C4&concentrationArea=AREA_CONC_1%2C9&SEARCH_TERM=both",
            "http://dceweb.harvard.edu/prod/sswcpgm.taf?function=search&wgrp=ALMIT&_UserReference=E11F5775BEB5C7554DDE88C4&concentrationArea=AREA_CONC_2%2C9&SEARCH_TERM=both",
            "http://dceweb.harvard.edu/prod/sswcpgm.taf?function=search&wgrp=ALMIT&_UserReference=E11F5775BEB5C7554DDE88C4&concentrationArea=AREA_CONC_5%2C6&SEARCH_TERM=both"]

for ind_url in all_urls:

    # DOM object for each concentration
    url = URL(ind_url)
    dom = DOM(url.download(cached=True))

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

                course_id = ""
                course_url_base = ""
                instructor_name = ""
                instructor_code = ""
                instructor_url = ""
                instructor_email = ""

                for i in range(len(all_columns)):

                    ind_column = plaintext(str(all_columns[i]))

                    if i == 0:
                        if ind_column.find("Summer") != -1:
                            course_url_base = "http://www.summer.harvard.edu/courses/"
                        else:
                            course_url_base = "http://www.extension.harvard.edu/courses/"

                    if i == 1:
                        course_id = plaintext(str(all_columns[i]))
                        course_url = URL(course_url_base+course_id)
                        course_dom = DOM(course_url.download(cached=True))
                        all_instructor_content = course_dom.by_class("field-field-instructor")

                        for j in range(len(all_instructor_content)):
                            instructor_content = all_instructor_content[j].by_tag("a")

                            for k in range(len(instructor_content)):
                                instructor_name = plaintext(str(instructor_content[k]))
                                instructor_url = "http://www.extension.harvard.edu"+instructor_content[k].attributes.get("href", "")
                                instructor_code = instructor_url.replace("http://www.extension.harvard.edu/about-us/faculty-directory/", "")
                                instructor_email = ""

                                email_url = URL(instructor_url)
                                email_dom = DOM(email_url.download(cached=True))
                                all_email_content = email_dom.by_class("field-field-email")

                                for l in range(len(all_email_content)):
                                    email_content = all_email_content[l].by_tag("a")

                                    if len(email_content) > 0:
                                        instructor_email = plaintext(str(email_content[0]))

                                print course_id + " " + instructor_code + " " + instructor_name + " " + instructor_url + " " + instructor_email

                                date_to_write.append([course_id, instructor_code, instructor_name, instructor_url, instructor_email])

# at this point we have all the movie rows required, print them out to the CSV file
writer.writerows(date_to_write)

# close the CSV file
output.close()