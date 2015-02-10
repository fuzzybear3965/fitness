function [ num ] = Lift2num( lift )
% Translates lifts into numbers in an array

k=0;
for j=1:length(lift)
    
    k=k+1;

    if strcmp('Back Squat',lift{j})==1
        num(k)=1;
    elseif strcmp('Front Squat',lift{j})==1
        num(k)=2;
    elseif strcmp('Overhead Squat',lift{j})==1
        num(k)=3;
    elseif strcmp('Deep Back Squat',lift{j})==1
        num(k)=4;
    elseif strcmp('Clean',lift{j})==1
        num(k)=5;
    elseif strcmp('Power Clean',lift{j})==1
        num(k)=6;
    elseif strcmp('Hang Power Clean',lift{j})==1
        num(k)=7;
    elseif strcmp('Shoulder Press',lift{j})==1
        num(k)=8;
    elseif strcmp('Push Press',lift{j})==1
        num(k)=9;
    elseif strcmp('Push Jerk',lift{j})==1
        num(k)=10;
    elseif strcmp('Snatch',lift{j})==1
        num(k)=11;
    elseif strcmp('Squat Thruster',lift{j})==1
        num(k)=12;
    elseif strcmp('Deadlift',lift{j})==1
        num(k)=13;
    elseif strcmp('Sumo Deadlift High Pull',lift{j})==1
        num(k)=14;
    elseif strcmp('Decline Bench Press',lift{j})==1
        num(k)=15;
    elseif strcmp('Incline Bench Press',lift{j})==1
        num(k)=16;
    elseif strcmp('Flat Bench Press',lift{j})==1
        num(k)=17;
    elseif strcmp('Incline Dumbbell Press',lift{j})==1
        num(k)=18;
    elseif strcmp('Flat Dumbbell Press',lift{j})==1
        num(k)=19;
    elseif strcmp('Bent Over Row',lift{j})==1
        num(k)=20;
    else
        num(k)=0;
    end
    
end

