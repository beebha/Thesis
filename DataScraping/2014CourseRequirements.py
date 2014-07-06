__author__ = 'bharathi'

# We are first importing from the pattern library and csv
import csv, datetime, cStringIO, codecs
from pattern.web import URL, DOM, plaintext

AllNumbers = {
    'zero': '0',
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
    'ten': '10',
    'eleven': '11',
    'twelve': '12',
    'thirteen': '13',
    'fourteen': '14',
    'fifteen': '15',
    'sixteen': '16',
    'seventeen': '17',
    'eighteen': '18',
    'nineteen': '19',
    'twenty': '20'
}

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
output = open("output/detailed_course_requirements_"+timestamp+".csv", "wb")
writer = UnicodeWriter(output)

# Get the DOM object.
url = URL("http://www.extension.harvard.edu/degrees-certificates/information-technology/choosing-courses/degree-course-search")
dom = DOM(url.download(cached=True))

# add header row
writer.writerow(["Concentration", "Requirement", "RequirementCount", "Admission", "Thesis", "Capstone"])

all_requirements = dom.by_tag("label")

all_info = []

course_concentration = ""
course_requirements = []

for ind_requirement in all_requirements:

    if ind_requirement.attributes.get("for", "").find("se_") != -1 or ind_requirement.attributes.get("for", "").find("ims_") != -1 or ind_requirement.attributes.get("for", "").find("dmid_") != -1:

        single_requirement = plaintext(str(ind_requirement)).strip()

        if single_requirement.find("All") != -1:
            if single_requirement.find("All software") != -1:
                course_concentration = "Software Engineering"
            if single_requirement.find("All information") != -1:
                course_concentration = "Information Management Systems"
            if single_requirement.find("All digital") != -1:
                course_concentration = "Digital Media And Instructional Design"

        if single_requirement.find("(") != -1:
            single_req_info = single_requirement.split("(")
            is_admission = "FALSE"
            is_capstone = "FALSE"
            is_thesis = "FALSE"

            single_req = str(single_req_info[0].strip().title())

            single_req_count = AllNumbers[single_req_info[1].split("course")[0].strip()]

            if single_req_info[1].find("admission") != -1:
                is_admission = "TRUE"

            if single_req_info[1].find("thesis") != -1 and single_req_info[1].find("capstone") != -1:
                more_info = single_req_info[1].split(";")
                for x in more_info:
                    if x.find("thesis") != -1:
                        single_req_count = AllNumbers[x.split("course")[0].strip()]
                        course_requirements.append([single_req, single_req_count, is_admission, "TRUE", "FALSE"])
                    if x.find("capstone") != -1:
                        single_req_count = AllNumbers[x.split("for")[0].strip()]
                        course_requirements.append([single_req, single_req_count, is_admission, "FALSE", "TRUE"])

            elif single_req_info[1].find(";") != -1 and single_req_info[1].find("capstone") != -1:
                single_req_count = AllNumbers[single_req_info[1].split("course")[0].strip()]
                course_requirements.append([single_req, single_req_count, is_admission, "FALSE", "TRUE"])

            elif single_req_info[1].find(";") != -1 and single_req_info[0].find("Capstone") != -1:
                single_req_count = AllNumbers[single_req_info[1].split("course")[0].strip()]
                course_requirements.append([single_req, single_req_count, is_admission, "FALSE", "TRUE"])

            else:
                single_req_count = AllNumbers[single_req_info[1].split("course")[0].strip()]
                course_requirements.append([single_req, single_req_count, is_admission, "TRUE", "FALSE"])

            for course_req in course_requirements:
                info_row = []
                info_row.append(course_concentration)
                for ind_var in course_req:
                    info_row.append(ind_var)
                writer.writerow(info_row)

            course_requirements = []

# close the CSV file
output.close()



