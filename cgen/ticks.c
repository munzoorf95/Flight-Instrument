#include <stdio.h>
#include <math.h>
#define PI 3.1415926
int main(int argc,char *argv[])
{
  float r3 = 45.0f;
  float r1 = 40.0f;
  float r2 = 49.0f;
  float cx = 50.0f;
  float cy = 50.0f;
  float a  = 270.0f * (PI/180.0f);
  float da = PI / 25;
  float sw = '0.5';
  float x1 = cos(a) * r1 + cx;
  float y1 = sin(a) * r1 + cy;
  float x2 = cos(a) * r2 + cx;
  float y2 = sin(a) * r2 + cy;
  int   index;
  index = 0;
  for(int i=0;i<50;++i) {
    if ((i % 5) == 0) {
      sw = 1.0f;
      x1 = cos(a) * r1 + cx;
      y1 = sin(a) * r1 + cy;
      x2 = cos(a) * r2 + cx;
      y2 = sin(a) * r2 + cy;
      printf("<line stroke-width='%.1f' x1='%.2f' y1='%.2f' x2='%.2f' y2='%.2f'/>\n",sw,x1,y1,x2,y2);
      index++;
    }
    else {
      sw = 0.5f;
      x1 = cos(a) * r3 + cx;
      y1 = sin(a) * r3 + cy;
      x2 = cos(a) * r2 + cx;
      y2 = sin(a) * r2 + cy;
      printf("<line x1='%.2f' y1='%.2f' x2='%.2f' y2='%.2f'/>\n",x1,y1,x2,y2);
    }
    a += da;
  }
  printf("<text x='50.00' y='16.5' text-anchor='middle'>0</text>");
  printf("<text x='71' y='22.5' text-anchor='middle'>1</text>");
  printf("<text x='85' y='41' text-anchor='middle'>2</text>");
  printf("<text x='85' y='65' text-anchor='middle'>3</text>");
  printf("<text x='70.5' y='82' text-anchor='middle'>4</text>");
  printf("<text x='50' y='88' text-anchor='middle'>5</text>");
  printf("<text x='15' y='65' text-anchor='middle'>7</text>");
  printf("<text x='15' y='41' text-anchor='middle'>8</text>");
  printf("<text x='29' y='82' text-anchor='middle'>6</text>");
  printf("<text x='29' y='22.75' text-anchor='middle'>9</text>");
  return 0;
}
