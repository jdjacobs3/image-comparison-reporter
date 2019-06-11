This is a node js script that takes two versions of the same base api endpoint and a json file containing an array of query string parameters of that, when appended to the api endpoint generate, a png image. The script then takes the two images produced by each api version and compares them using the open source resemblejs library. The script then creates a results object using the data from each resemblejs test call and http headers from the api requests, and generates an HTML report made up of the data in the results object.

example script call after cd'ing into the src folder:

    node index.js --base_url_domain=http://example-domain/1.0.0/ --test_url_domain=http://example-domain/1.0.1/ --parameter_list=paramList.json --min_mismatch_percentage=10 --output_type=html --output_file_path=../exampleTestCall

______________________________________________________________________________________________________________________________
Mandatory Command Line Arguments: 

`base_url_domain` -- Domain of the base api version that will serve as the control in the comparison test. 

`test_url_domain` -- Domain of the test api version that will be tested against the base domain.             

`parameter_list` -- JSON file containing only an array of query string parameters that will appended to both URL domains to create the test URLs used in the report.

Optional Command Line Arguments:

`min_mismatch_percentage` -- Allows the user to filter the results of the HTML report to only display the image comparisons that have a mismatch percentage over the specified value. If let unset the variable will default to -1. If set to over 100 it will be reset to 0 and an error message will be printed to the command line. If set as any type other than int the script will crash.

`output_type` -- Specifies whether or not the report will be an HTML file or a JSON file. Only acceptable values are 'json', 'html' (not case sensitive), or leaving it undefined. Any other value will trigger an error message to be printed out to the command line, and the report will not be generated. If left undefined the output file will be set to HTML by default.

`output_file_path` -- Used to customize the file name of the report and where the report will be located in the user's file tree. Only acceptable value would be a string containing the custom path and custom name of the file, for instance: "../../../example". DO NOT put ".json" or ".html" at the end of the input string; the proper file type will be appended in the script. The default name is "imageComparisonReport" and the default file location is in the "src" folder of this tool. Proper error handling has not been implemented for this argument, so invalid inputs may lead to reports being generated with unexpected names and/or in unexpected locations.