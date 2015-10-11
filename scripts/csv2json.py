import csv, json, sys, re, argparse, datetime, time

def csv2json(infilepath, delim, keyarray, dateformat):
    """ Converts an input csv file to json treating each line as a
        document. Example usage: 
        python csv2json.py --infile="..\ArnaudWeights.csv" --delim=","
        --fieldlist=Lift,Weight,Reps,Sets,Date,Comment """
    print dateformat
    with open(infilepath,'rb') as csvfile:
        spamreader = csv.reader(csvfile, delimiter = delim)
        # spamreader is a list of lines. Each line is a list of words.
        kvpairs = []  
        # kvpairs stores an array of dictionaries that will be turned
        # into a JSON document
        linecnt = 0
        for line in spamreader:
            linedict = {}
            itemcnt = 0
            for item in line:
                if linecnt > 1: # skip first line
                    print "line number: " + str(linecnt)
                    lineword = item.lstrip().rstrip()
                    print "Field being processed: " + keyarray[itemcnt]
                    print "Value being processed: " + lineword
                    if keyarray[itemcnt].lower() == ('DATE'.lower() or
                            'DATES'.lower()):
                        print lineword
                        date = datetime.datetime.strptime(lineword, dateformat)
                        lineword = date.isoformat()
                    linedict[keyarray[itemcnt]] = lineword
                    itemcnt += 1
                linecnt += 1
            kvpairs.append(linedict)
        with open('out.json', 'w') as outfile:
            json.dump(kvpairs, outfile)

parser = argparse.ArgumentParser()
parser.add_argument('--infile', type=str)
parser.add_argument('--delim', type=str)
parser.add_argument('--fieldlist', type=str)
parser.add_argument('--dateformat', type=str)
# put the arguments in the parser object
args = parser.parse_args()
# put the parsed arguments in args
infile = args.infile
delimiter = args.delim
keys = args.fieldlist.split(',')
dtfmt = args.dateformat
# make the variables that we'll pass to csv2json
csv2json(infile, delimiter, keys, dtfmt)
