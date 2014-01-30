from google.appengine.api import xmpp
from datetime import date, time, datetime, timedelta

def main():
    d = date(2014, 3, 20)
    t = time(0, 50)
    dt = datetime.combine(d, t)
    timeleft = dt - datetime.now()
#    xmpp.send_message("brian.woodward@gmail.com", str(timeleft))

if __name__ == "__main__":
    main()
