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
output = open("output/course_key_"+timestamp+".csv", "wb")
writer = UnicodeWriter(output)

# add 1st header row
writer.writerow(["Concentration", "Requirement", "RequirementKey"])

date_to_write = []

all_urls = ["http://dceweb.harvard.edu/prod/sswcpgm.taf?function=search&wgrp=ALMIT&_UserReference=E11F5775BEB5C7554DDE88C4&concentrationArea=AREA_CONC_1%2C9&SEARCH_TERM=both",
            "http://dceweb.harvard.edu/prod/sswcpgm.taf?function=search&wgrp=ALMIT&_UserReference=E11F5775BEB5C7554DDE88C4&concentrationArea=AREA_CONC_2%2C9&SEARCH_TERM=both",
            "http://dceweb.harvard.edu/prod/sswcpgm.taf?function=search&wgrp=ALMIT&_UserReference=E11F5775BEB5C7554DDE88C4&concentrationArea=AREA_CONC_5%2C6&SEARCH_TERM=both"]

all_concentrations = ["Software Engineering",
                      "Information Management Systems",
                      "Digital Media And Instructional Design"]

count = 0

for ind_url in all_urls:

    # DOM object for each concentration
    url = URL(ind_url)
    dom = DOM(url.download(cached=True))
    all_tables = dom.by_tag("table")

    # current concentration
    concentration = all_concentrations[count]

    # loop through each table
    for ind_table in all_tables:
        if plaintext(str(ind_table)).find("Key to Course Attributes") != -1:
            all_columns = ind_table.by_tag("td")
            for ind_column in all_columns:
                if (str(ind_column)).strip().find("<td>") != -1 and plaintext(str(ind_column)).strip() != "" and plaintext(str(ind_column)).strip().find("Available via Internet") == -1:
                    req_info = plaintext(str(ind_column)).strip().split("=")
                    req_key = req_info[0].strip()
                    req = (req_info[1].strip()).split("(")[0].strip()
                    date_to_write.append([concentration, req, req_key])

    count += 1


# at this point we have all the movie rows required, print them out to the CSV file
writer.writerows(date_to_write)

# close the CSV file
output.close()





