function y(K){if(K<0)return-1;else if(K===0)return 0;else return 1}function e(K,$,Q){return(1-Q)*K+Q*$}function WK(K,$,Q){if(Q<K)return K;else if(Q>$)return $;return Q}function OK(K){if(K=K%360,K<0)K=K+360;return K}function b(K,$){let Q=K[0]*$[0][0]+K[1]*$[0][1]+K[2]*$[0][2],q=K[0]*$[1][0]+K[1]*$[1][1]+K[2]*$[1][2],Z=K[0]*$[2][0]+K[1]*$[2][1]+K[2]*$[2][2];return[Q,q,Z]}var jK=[[0.41233895,0.35762064,0.18051042],[0.2126,0.7152,0.0722],[0.01932141,0.11916382,0.95034478]],FK=[[3.2413774792388685,-1.5376652402851851,-0.49885366846268053],[-0.9691452513005321,1.8758853451067872,0.04156585616912061],[0.05562093689691305,-0.20395524564742123,1.0571799111220335]],zK=[95.047,100,108.883];function i(K,$,Q){return(-16777216|(K&255)<<16|($&255)<<8|Q&255)>>>0}function KK(K){let $=u(K[0]),Q=u(K[1]),q=u(K[2]);return i($,Q,q)}function $K(K){return K>>16&255}function QK(K){return K>>8&255}function qK(K){return K&255}function TK(K,$,Q){let q=FK,Z=q[0][0]*K+q[0][1]*$+q[0][2]*Q,E=q[1][0]*K+q[1][1]*$+q[1][2]*Q,X=q[2][0]*K+q[2][1]*$+q[2][2]*Q,J=u(Z),W=u(E),U=u(X);return i(J,W,U)}function AK(K){let $=w($K(K)),Q=w(QK(K)),q=w(qK(K));return b([$,Q,q],jK)}function GK(K){let $=m(K),Q=u($);return i(Q,Q,Q)}function ZK(K){let $=AK(K)[1];return 116*BK($/100)-16}function m(K){return 100*SK((K+16)/116)}function NK(K){return BK(K/100)*116-16}function w(K){let $=K/255;if($<=0.040449936)return $/12.92*100;else return Math.pow(($+0.055)/1.055,2.4)*100}function u(K){let $=K/100,Q=0;if($<=0.0031308)Q=$*12.92;else Q=1.055*Math.pow($,0.4166666666666667)-0.055;return WK(0,255,Math.round(Q*255))}function MK(){return zK}function BK(K){if(K>0.008856451679035631)return Math.pow(K,0.3333333333333333);else return(903.2962962962963*K+16)/116}function SK(K){let q=K*K*K;if(q>0.008856451679035631)return q;else return(116*K-16)/903.2962962962963}class F{static make(K=MK(),$=200/Math.PI*m(50)/100,Q=50,q=2,Z=!1){let E=K,X=E[0]*0.401288+E[1]*0.650173+E[2]*-0.051461,J=E[0]*-0.250268+E[1]*1.204414+E[2]*0.045854,W=E[0]*-0.002079+E[1]*0.048952+E[2]*0.953127,U=0.8+q/10,O=U>=0.9?e(0.59,0.69,(U-0.9)*10):e(0.525,0.59,(U-0.8)*10),T=Z?1:U*(1-0.2777777777777778*Math.exp((-$-42)/92));T=T>1?1:T<0?0:T;let B=U,N=[T*(100/X)+1-T,T*(100/J)+1-T,T*(100/W)+1-T],k=1/(5*$+1),M=k*k*k*k,D=1-M,I=M*$+0.1*D*D*Math.cbrt(5*$),R=m(Q)/K[1],z=1.48+Math.sqrt(R),f=0.725/Math.pow(R,0.2),_=f,G=[Math.pow(I*N[0]*X/100,0.42),Math.pow(I*N[1]*J/100,0.42),Math.pow(I*N[2]*W/100,0.42)],P=[400*G[0]/(G[0]+27.13),400*G[1]/(G[1]+27.13),400*G[2]/(G[2]+27.13)],L=(2*P[0]+P[1]+0.05*P[2])*f;return new F(R,L,f,_,O,B,N,I,Math.pow(I,0.25),z)}constructor(K,$,Q,q,Z,E,X,J,W,U){this.n=K,this.aw=$,this.nbb=Q,this.ncb=q,this.c=Z,this.nc=E,this.rgbD=X,this.fl=J,this.fLRoot=W,this.z=U}}F.DEFAULT=F.make();class j{constructor(K,$,Q,q,Z,E,X,J,W){this.hue=K,this.chroma=$,this.j=Q,this.q=q,this.m=Z,this.s=E,this.jstar=X,this.astar=J,this.bstar=W}distance(K){let $=this.jstar-K.jstar,Q=this.astar-K.astar,q=this.bstar-K.bstar,Z=Math.sqrt($*$+Q*Q+q*q);return 1.41*Math.pow(Z,0.63)}static fromInt(K){return j.fromIntInViewingConditions(K,F.DEFAULT)}static fromIntInViewingConditions(K,$){let Q=(K&16711680)>>16,q=(K&65280)>>8,Z=K&255,E=w(Q),X=w(q),J=w(Z),W=0.41233895*E+0.35762064*X+0.18051042*J,U=0.2126*E+0.7152*X+0.0722*J,O=0.01932141*E+0.11916382*X+0.95034478*J,T=0.401288*W+0.650173*U-0.051461*O,B=-0.250268*W+1.204414*U+0.045854*O,N=-0.002079*W+0.048952*U+0.953127*O,k=$.rgbD[0]*T,M=$.rgbD[1]*B,D=$.rgbD[2]*N,I=Math.pow($.fl*Math.abs(k)/100,0.42),R=Math.pow($.fl*Math.abs(M)/100,0.42),z=Math.pow($.fl*Math.abs(D)/100,0.42),f=y(k)*400*I/(I+27.13),_=y(M)*400*R/(R+27.13),G=y(D)*400*z/(z+27.13),P=(11*f+-12*_+G)/11,L=(f+_-2*G)/9,V=(20*f+20*_+21*G)/20,S=(40*f+20*_+G)/20,p=Math.atan2(L,P)*180/Math.PI,A=p<0?p+360:p>=360?p-360:p,l=A*Math.PI/180,d=S*$.nbb,h=100*Math.pow(d/$.aw,$.c*$.z),g=4/$.c*Math.sqrt(h/100)*($.aw+4)*$.fLRoot,r=A<20.14?A+360:A,n=3846.153846153846*(0.25*(Math.cos(r*Math.PI/180+2)+3.8))*$.nc*$.ncb*Math.sqrt(P*P+L*L)/(V+0.305),s=Math.pow(n,0.9)*Math.pow(1.64-Math.pow(0.29,$.n),0.73),YK=s*Math.sqrt(h/100),JK=YK*$.fLRoot,DK=50*Math.sqrt(s*$.c/($.aw+4)),RK=1.7000000000000002*h/(1+0.007*h),UK=43.859649122807014*Math.log(1+0.0228*JK),yK=UK*Math.cos(l),fK=UK*Math.sin(l);return new j(A,YK,h,g,JK,DK,RK,yK,fK)}static fromJch(K,$,Q){return j.fromJchInViewingConditions(K,$,Q,F.DEFAULT)}static fromJchInViewingConditions(K,$,Q,q){let Z=4/q.c*Math.sqrt(K/100)*(q.aw+4)*q.fLRoot,E=$*q.fLRoot,X=$/Math.sqrt(K/100),J=50*Math.sqrt(X*q.c/(q.aw+4)),W=Q*Math.PI/180,U=1.7000000000000002*K/(1+0.007*K),O=43.859649122807014*Math.log(1+0.0228*E),T=O*Math.cos(W),B=O*Math.sin(W);return new j(Q,$,K,Z,E,J,U,T,B)}static fromUcs(K,$,Q){return j.fromUcsInViewingConditions(K,$,Q,F.DEFAULT)}static fromUcsInViewingConditions(K,$,Q,q){let Z=$,E=Q,X=Math.sqrt(Z*Z+E*E),W=(Math.exp(X*0.0228)-1)/0.0228/q.fLRoot,U=Math.atan2(E,Z)*(180/Math.PI);if(U<0)U+=360;let O=K/(1-(K-100)*0.007);return j.fromJchInViewingConditions(O,W,U,q)}toInt(){return this.viewed(F.DEFAULT)}viewed(K){let $=this.chroma===0||this.j===0?0:this.chroma/Math.sqrt(this.j/100),Q=Math.pow($/Math.pow(1.64-Math.pow(0.29,K.n),0.73),1.1111111111111112),q=this.hue*Math.PI/180,Z=0.25*(Math.cos(q+2)+3.8),E=K.aw*Math.pow(this.j/100,1/K.c/K.z),X=Z*3846.153846153846*K.nc*K.ncb,J=E/K.nbb,W=Math.sin(q),U=Math.cos(q),O=23*(J+0.305)*Q/(23*X+11*Q*U+108*Q*W),T=O*U,B=O*W,N=(460*J+451*T+288*B)/1403,k=(460*J-891*T-261*B)/1403,M=(460*J-220*T-6300*B)/1403,D=Math.max(0,27.13*Math.abs(N)/(400-Math.abs(N))),I=y(N)*(100/K.fl)*Math.pow(D,2.380952380952381),R=Math.max(0,27.13*Math.abs(k)/(400-Math.abs(k))),z=y(k)*(100/K.fl)*Math.pow(R,2.380952380952381),f=Math.max(0,27.13*Math.abs(M)/(400-Math.abs(M))),_=y(M)*(100/K.fl)*Math.pow(f,2.380952380952381),G=I/K.rgbD[0],P=z/K.rgbD[1],L=_/K.rgbD[2],V=1.86206786*G-1.01125463*P+0.14918677*L,S=0.38752654*G+0.62144744*P-0.00897398*L,H=-0.0158415*G-0.03412294*P+1.04996444*L;return TK(V,S,H)}static fromXyzInViewingConditions(K,$,Q,q){let Z=0.401288*K+0.650173*$-0.051461*Q,E=-0.250268*K+1.204414*$+0.045854*Q,X=-0.002079*K+0.048952*$+0.953127*Q,J=q.rgbD[0]*Z,W=q.rgbD[1]*E,U=q.rgbD[2]*X,O=Math.pow(q.fl*Math.abs(J)/100,0.42),T=Math.pow(q.fl*Math.abs(W)/100,0.42),B=Math.pow(q.fl*Math.abs(U)/100,0.42),N=y(J)*400*O/(O+27.13),k=y(W)*400*T/(T+27.13),M=y(U)*400*B/(B+27.13),D=(11*N+-12*k+M)/11,I=(N+k-2*M)/9,R=(20*N+20*k+21*M)/20,z=(40*N+20*k+M)/20,_=Math.atan2(I,D)*180/Math.PI,G=_<0?_+360:_>=360?_-360:_,P=G*Math.PI/180,L=z*q.nbb,V=100*Math.pow(L/q.aw,q.c*q.z),S=4/q.c*Math.sqrt(V/100)*(q.aw+4)*q.fLRoot,H=G<20.14?G+360:G,l=3846.153846153846*(0.25*(Math.cos(H*Math.PI/180+2)+3.8))*q.nc*q.ncb*Math.sqrt(D*D+I*I)/(R+0.305),d=Math.pow(l,0.9)*Math.pow(1.64-Math.pow(0.29,q.n),0.73),h=d*Math.sqrt(V/100),g=h*q.fLRoot,r=50*Math.sqrt(d*q.c/(q.aw+4)),XK=1.7000000000000002*V/(1+0.007*V),o=Math.log(1+0.0228*g)/0.0228,n=o*Math.cos(P),s=o*Math.sin(P);return new j(G,h,V,S,g,r,XK,n,s)}xyzInViewingConditions(K){let $=this.chroma===0||this.j===0?0:this.chroma/Math.sqrt(this.j/100),Q=Math.pow($/Math.pow(1.64-Math.pow(0.29,K.n),0.73),1.1111111111111112),q=this.hue*Math.PI/180,Z=0.25*(Math.cos(q+2)+3.8),E=K.aw*Math.pow(this.j/100,1/K.c/K.z),X=Z*3846.153846153846*K.nc*K.ncb,J=E/K.nbb,W=Math.sin(q),U=Math.cos(q),O=23*(J+0.305)*Q/(23*X+11*Q*U+108*Q*W),T=O*U,B=O*W,N=(460*J+451*T+288*B)/1403,k=(460*J-891*T-261*B)/1403,M=(460*J-220*T-6300*B)/1403,D=Math.max(0,27.13*Math.abs(N)/(400-Math.abs(N))),I=y(N)*(100/K.fl)*Math.pow(D,2.380952380952381),R=Math.max(0,27.13*Math.abs(k)/(400-Math.abs(k))),z=y(k)*(100/K.fl)*Math.pow(R,2.380952380952381),f=Math.max(0,27.13*Math.abs(M)/(400-Math.abs(M))),_=y(M)*(100/K.fl)*Math.pow(f,2.380952380952381),G=I/K.rgbD[0],P=z/K.rgbD[1],L=_/K.rgbD[2],V=1.86206786*G-1.01125463*P+0.14918677*L,S=0.38752654*G+0.62144744*P-0.00897398*L,H=-0.0158415*G-0.03412294*P+1.04996444*L;return[V,S,H]}}class Y{static sanitizeRadians(K){return(K+Math.PI*8)%(Math.PI*2)}static trueDelinearized(K){let $=K/100,Q=0;if($<=0.0031308)Q=$*12.92;else Q=1.055*Math.pow($,0.4166666666666667)-0.055;return Q*255}static chromaticAdaptation(K){let $=Math.pow(Math.abs(K),0.42);return y(K)*400*$/($+27.13)}static hueOf(K){let $=b(K,Y.SCALED_DISCOUNT_FROM_LINRGB),Q=Y.chromaticAdaptation($[0]),q=Y.chromaticAdaptation($[1]),Z=Y.chromaticAdaptation($[2]),E=(11*Q+-12*q+Z)/11,X=(Q+q-2*Z)/9;return Math.atan2(X,E)}static areInCyclicOrder(K,$,Q){let q=Y.sanitizeRadians($-K),Z=Y.sanitizeRadians(Q-K);return q<Z}static intercept(K,$,Q){return($-K)/(Q-K)}static lerpPoint(K,$,Q){return[K[0]+(Q[0]-K[0])*$,K[1]+(Q[1]-K[1])*$,K[2]+(Q[2]-K[2])*$]}static setCoordinate(K,$,Q,q){let Z=Y.intercept(K[q],$,Q[q]);return Y.lerpPoint(K,Z,Q)}static isBounded(K){return 0<=K&&K<=100}static nthVertex(K,$){let Q=Y.Y_FROM_LINRGB[0],q=Y.Y_FROM_LINRGB[1],Z=Y.Y_FROM_LINRGB[2],E=$%4<=1?0:100,X=$%2===0?0:100;if($<4){let J=E,W=X,U=(K-J*q-W*Z)/Q;if(Y.isBounded(U))return[U,J,W];else return[-1,-1,-1]}else if($<8){let J=E,W=X,U=(K-W*Q-J*Z)/q;if(Y.isBounded(U))return[W,U,J];else return[-1,-1,-1]}else{let J=E,W=X,U=(K-J*Q-W*q)/Z;if(Y.isBounded(U))return[J,W,U];else return[-1,-1,-1]}}static bisectToSegment(K,$){let Q=[-1,-1,-1],q=Q,Z=0,E=0,X=!1,J=!0;for(let W=0;W<12;W++){let U=Y.nthVertex(K,W);if(U[0]<0)continue;let O=Y.hueOf(U);if(!X){Q=U,q=U,Z=O,E=O,X=!0;continue}if(J||Y.areInCyclicOrder(Z,O,E))if(J=!1,Y.areInCyclicOrder(Z,$,O))q=U,E=O;else Q=U,Z=O}return[Q,q]}static midpoint(K,$){return[(K[0]+$[0])/2,(K[1]+$[1])/2,(K[2]+$[2])/2]}static criticalPlaneBelow(K){return Math.floor(K-0.5)}static criticalPlaneAbove(K){return Math.ceil(K-0.5)}static bisectToLimit(K,$){let Q=Y.bisectToSegment(K,$),q=Q[0],Z=Y.hueOf(q),E=Q[1];for(let X=0;X<3;X++)if(q[X]!==E[X]){let J=-1,W=255;if(q[X]<E[X])J=Y.criticalPlaneBelow(Y.trueDelinearized(q[X])),W=Y.criticalPlaneAbove(Y.trueDelinearized(E[X]));else J=Y.criticalPlaneAbove(Y.trueDelinearized(q[X])),W=Y.criticalPlaneBelow(Y.trueDelinearized(E[X]));for(let U=0;U<8;U++)if(Math.abs(W-J)<=1)break;else{let O=Math.floor((J+W)/2),T=Y.CRITICAL_PLANES[O],B=Y.setCoordinate(q,T,E,X),N=Y.hueOf(B);if(Y.areInCyclicOrder(Z,$,N))E=B,W=O;else q=B,Z=N,J=O}}return Y.midpoint(q,E)}static inverseChromaticAdaptation(K){let $=Math.abs(K),Q=Math.max(0,27.13*$/(400-$));return y(K)*Math.pow(Q,2.380952380952381)}static findResultByJ(K,$,Q){let q=Math.sqrt(Q)*11,Z=F.DEFAULT,E=1/Math.pow(1.64-Math.pow(0.29,Z.n),0.73),J=0.25*(Math.cos(K+2)+3.8)*3846.153846153846*Z.nc*Z.ncb,W=Math.sin(K),U=Math.cos(K);for(let O=0;O<5;O++){let T=q/100,B=$===0||q===0?0:$/Math.sqrt(T),N=Math.pow(B*E,1.1111111111111112),M=Z.aw*Math.pow(T,1/Z.c/Z.z)/Z.nbb,D=23*(M+0.305)*N/(23*J+11*N*U+108*N*W),I=D*U,R=D*W,z=(460*M+451*I+288*R)/1403,f=(460*M-891*I-261*R)/1403,_=(460*M-220*I-6300*R)/1403,G=Y.inverseChromaticAdaptation(z),P=Y.inverseChromaticAdaptation(f),L=Y.inverseChromaticAdaptation(_),V=b([G,P,L],Y.LINRGB_FROM_SCALED_DISCOUNT);if(V[0]<0||V[1]<0||V[2]<0)return 0;let S=Y.Y_FROM_LINRGB[0],H=Y.Y_FROM_LINRGB[1],p=Y.Y_FROM_LINRGB[2],A=S*V[0]+H*V[1]+p*V[2];if(A<=0)return 0;if(O===4||Math.abs(A-Q)<0.002){if(V[0]>100.01||V[1]>100.01||V[2]>100.01)return 0;return KK(V)}q=q-(A-Q)*q/(2*A)}return 0}static solveToInt(K,$,Q){if($<0.0001||Q<0.0001||Q>99.9999)return GK(Q);K=OK(K);let q=K/180*Math.PI,Z=m(Q),E=Y.findResultByJ(q,$,Z);if(E!==0)return E;let X=Y.bisectToLimit(Z,q);return KK(X)}static solveToCam(K,$,Q){return j.fromInt(Y.solveToInt(K,$,Q))}}Y.SCALED_DISCOUNT_FROM_LINRGB=[[0.001200833568784504,0.002389694492170889,0.0002795742885861124],[0.0005891086651375999,0.0029785502573438758,0.0003270666104008398],[0.00010146692491640572,0.0005364214359186694,0.0032979401770712076]];Y.LINRGB_FROM_SCALED_DISCOUNT=[[1373.2198709594231,-1100.4251190754821,-7.278681089101213],[-271.815969077903,559.6580465940733,-32.46047482791194],[1.9622899599665666,-57.173814538844006,308.7233197812385]];Y.Y_FROM_LINRGB=[0.2126,0.7152,0.0722];Y.CRITICAL_PLANES=[0.015176349177441876,0.045529047532325624,0.07588174588720938,0.10623444424209313,0.13658714259697685,0.16693984095186062,0.19729253930674434,0.2276452376616281,0.2579979360165119,0.28835063437139563,0.3188300904430532,0.350925934958123,0.3848314933096426,0.42057480301049466,0.458183274052838,0.4976837250274023,0.5391024159806381,0.5824650784040898,0.6277969426914107,0.6751227633498623,0.7244668422128921,0.775853049866786,0.829304845476233,0.8848452951698498,0.942497089126609,1.0022825574869039,1.0642236851973577,1.1283421258858297,1.1946592148522128,1.2631959812511864,1.3339731595349034,1.407011200216447,1.4823302800086415,1.5599503113873272,1.6398909516233677,1.7221716113234105,1.8068114625156377,1.8938294463134073,1.9832442801866852,2.075074464868551,2.1693382909216234,2.2660538449872063,2.36523901573795,2.4669114995532007,2.5710888059345764,2.6777882626779785,2.7870270208169257,2.898822059350997,3.0131901897720907,3.1301480604002863,3.2497121605402226,3.3718988244681087,3.4967242352587946,3.624204428461639,3.754355295633311,3.887192587735158,4.022731918402185,4.160988767090289,4.301978482107941,4.445716283538092,4.592217266055746,4.741496401646282,4.893568542229298,5.048448422192488,5.20615066083972,5.3666897647573375,5.5300801301023865,5.696336044816294,5.865471690767354,6.037501145825082,6.212438385869475,6.390297286737924,6.571091626112461,6.7548350853498045,6.941541251256611,7.131223617812143,7.323895587840543,7.5195704746346665,7.7182615035334345,7.919981813454504,8.124744458384042,8.332562408825165,8.543448553206703,8.757415699253682,8.974476575321063,9.194643831691977,9.417930041841839,9.644347703669503,9.873909240696694,10.106627003236781,10.342513269534024,10.58158024687427,10.8238400726681,11.069304815507364,11.317986476196008,11.569896988756009,11.825048221409341,12.083451977536606,12.345119996613247,12.610063955123938,12.878295467455942,13.149826086772048,13.42466730586372,13.702830557985108,13.984327217668513,14.269168601521828,14.55736596900856,14.848930523210871,15.143873411576273,15.44220572664832,15.743938506781891,16.04908273684337,16.35764934889634,16.66964922287304,16.985093187232053,17.30399201960269,17.62635644741625,17.95219714852476,18.281524751807332,18.614349837764564,18.95068293910138,19.290534541298456,19.633915083172692,19.98083495742689,20.331304511189067,20.685334046541502,21.042933821039977,21.404114048223256,21.76888489811322,22.137256497705877,22.50923893145328,22.884842241736916,23.264076429332462,23.6469514538663,24.033477234264016,24.42366364919083,24.817520537484558,25.21505769858089,25.61628489293138,26.021211842414342,26.429848230738664,26.842203703840827,27.258287870275353,27.678110301598522,28.10168053274597,28.529008062403893,28.96010235337422,29.39497283293396,29.83362889318845,30.276079891419332,30.722335150426627,31.172403958865512,31.62629557157785,32.08401920991837,32.54558406207592,33.010999283389665,33.4802739966603,33.953417292456834,34.430438229418264,34.911345834551085,35.39614910352207,35.88485700094671,36.37747846067349,36.87402238606382,37.37449765026789,37.87891309649659,38.38727753828926,38.89959975977785,39.41588851594697,39.93615253289054,40.460400508064545,40.98864111053629,41.520882981230194,42.05713473317016,42.597404951718396,43.141702194811224,43.6900349931913,44.24241185063697,44.798841244188324,45.35933162437017,45.92389141541209,46.49252901546552,47.065252796817916,47.64207110610409,48.22299226451468,48.808024568002054,49.3971762874833,49.9904556690408,50.587870934119984,51.189430279724725,51.79514187861014,52.40501387947288,53.0190544071392,53.637271562750364,54.259673423945976,54.88626804504493,55.517063457223934,56.15206766869424,56.79128866487574,57.43473440856916,58.08241284012621,58.734331877617365,59.39049941699807,60.05092333227251,60.715611475655585,61.38457167773311,62.057811747619894,62.7353394731159,63.417162620860914,64.10328893648692,64.79372614476921,65.48848194977529,66.18756403501224,66.89098006357258,67.59873767827808,68.31084450182222,69.02730813691093,69.74813616640164,70.47333615344107,71.20291564160104,71.93688215501312,72.67524319850172,73.41800625771542,74.16517879925733,74.9167682708136,75.67278210128072,76.43322770089146,77.1981124613393,77.96744375590167,78.74122893956174,79.51947534912904,80.30219030335869,81.08938110306934,81.88105503125999,82.67721935322541,83.4778813166706,84.28304815182372,85.09272707154808,85.90692527145302,86.72564993000343,87.54890820862819,88.3767072518277,89.2090541872801,90.04595612594655,90.88742016217518,91.73345337380438,92.58406282226491,93.43925555268066,94.29903859396902,95.16341895893969,96.03240364439274,96.9059996312159,97.78421388448044,98.6670533535366,99.55452497210776];class C{static from(K,$,Q){return new C(Y.solveToInt(K,$,Q))}static fromInt(K){return new C(K)}toInt(){return this.argb}get hue(){return this.internalHue}set hue(K){this.setInternalState(Y.solveToInt(K,this.internalChroma,this.internalTone))}get chroma(){return this.internalChroma}set chroma(K){this.setInternalState(Y.solveToInt(this.internalHue,K,this.internalTone))}get tone(){return this.internalTone}set tone(K){this.setInternalState(Y.solveToInt(this.internalHue,this.internalChroma,K))}constructor(K){this.argb=K;let $=j.fromInt(K);this.internalHue=$.hue,this.internalChroma=$.chroma,this.internalTone=ZK(K),this.argb=K}setInternalState(K){let $=j.fromInt(K);this.internalHue=$.hue,this.internalChroma=$.chroma,this.internalTone=ZK(K),this.argb=K}inViewingConditions(K){let Q=j.fromInt(this.toInt()).xyzInViewingConditions(K),q=j.fromXyzInViewingConditions(Q[0],Q[1],Q[2],F.make());return C.from(q.hue,q.chroma,NK(Q[1]))}}function VK(K){let $=$K(K),Q=QK(K),q=qK(K),Z=[$.toString(16),Q.toString(16),q.toString(16)];for(let[E,X]of Z.entries())if(X.length===1)Z[E]="0"+X;return"#"+Z.join("")}function kK(K){K=K.replace("#","");let $=K.length===3,Q=K.length===6,q=K.length===8;if(!$&&!Q&&!q)throw new Error("unexpected hex "+K);let Z=0,E=0,X=0;if($)Z=x(K.slice(0,1).repeat(2)),E=x(K.slice(1,2).repeat(2)),X=x(K.slice(2,3).repeat(2));else if(Q)Z=x(K.slice(0,2)),E=x(K.slice(2,4)),X=x(K.slice(4,6));else if(q)Z=x(K.slice(2,4)),E=x(K.slice(4,6)),X=x(K.slice(6,8));return(-16777216|(Z&255)<<16|(E&255)<<8|X&255)>>>0}function x(K){return parseInt(K,16)}var EK=(K,$)=>{let Q={...K};for(let q in $){if($[q]==null||$[q]==null)continue;if($[q]&&typeof $[q]==="object"&&!Array.isArray($[q]))Q[q]=EK(K[q],$[q]);else Q[q]=$[q]}return Q};var pK=[80,40,20],IK={darkMode:!0,colors:{primary:"#00adff"},tones:pK},v=(K,$,Q)=>VK(C.from(K,$,Q).toInt()),PK=(K)=>C.fromInt(kK(K)),LK=99,t=(K)=>{return Math.min(100-K+8,LK)},_K=(K,$,Q,q)=>{let Z={};for(let E of q)Z[E]=v(K,$,Q?t(E):E);return Z},xK=(K,$)=>({"1":v(K,8,$?8:LK),"2":v(K,14,$?t(94):94),"3":v(K,18,$?t(88):88),"4":v(K,20,$?t(84):84)}),rK=(K)=>{let $=K?EK(IK,K):IK,Q={};for(let[Z,E]of Object.entries($.colors)){let{hue:X,chroma:J}=PK(E);Q[Z]={..._K(X,J,$.darkMode,$.tones),surfaces:xK(X,$.darkMode)}}let q=PK($.colors.primary);return Q.neutral=_K(q.hue,8,$.darkMode,$.tones),Q},oK=(K)=>{let $={};for(let[Q,q]of Object.entries(K))for(let[Z,E]of Object.entries(q))if(Z=="surfaces")for(let[X,J]of Object.entries(E))$[`${String(Q)}_surface_${X}`]=J;else $[`${String(Q)}_${String(Z)}`]=E;return $};export{t as inverseTone,rK as generate,oK as flatten,IK as defaultOptions};
