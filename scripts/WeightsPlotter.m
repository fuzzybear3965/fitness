clear 

fid=fopen('../JohnsWeights.csv','r')
m=textscan(fid,repmat('%s',1,6),'delimiter',',','CollectOutput',true);
m=m{:};
dates = {m{2:end,5}};
lift= {m{2:end,1}};

ylab={'Back Squat','Front Squat','Overhead Squat','Deep Back Squat',...
    'Clean','Power Clean','Hang Power Clean','Shoulder Press','Push Press',...
    'Push Jerk','Snatch','Squat Thruster','Deadlift','Sumo Deadlift High Pull',...
    'Decline Bench Press','Incline Bench Press','Flat Bench Press','Incline Dumbbell Press','Flat Dumbbell Press','Bent Over Row'};
y=Lift2num(lift);
x=[1:length(dates)];
bar(x,y)
grid on
box on
axis([0 length(dates)+1 0 length(ylab)+1 ]);
set( gca, 'FontName', 'Helvetica','Layer','top');
set(gca,'Ytick',[1:length(ylab)],'YTickLabel',ylab)
hx=xticklabel_rotate(x,90,dates);
set(hx,'FontSize',5);
print -depsc2 JohnsWeights.eps