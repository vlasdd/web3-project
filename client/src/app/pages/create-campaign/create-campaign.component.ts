import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UpperCaseFirstLetterPipe } from '../../pipes/upper-case-first-letter/upper-case-first-letter.pipe';
import { LoaderService } from '../../services/loader/loader.service';
import { ThirdwebService } from '../../services/thirdweb/thirdweb.service';

@Component({
  selector: 'app-create-campaign',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  providers: [UpperCaseFirstLetterPipe],
  templateUrl: './create-campaign.component.html',
})
export class CreateCampaignComponent {
  title = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  imageUrl = new FormControl('', Validators.required);
  target = new FormControl(1, [Validators.required, Validators.min(0.01)]);
  deadline = new FormControl('', Validators.required);
  isLoading: boolean = false;

  constructor(
    private thirdwebService: ThirdwebService,
    private router: Router,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private upperCaseFirstLetterPipe: UpperCaseFirstLetterPipe
  ) {}

  ngOnInit() {
    this.loaderService.isLoading.subscribe((isLoaderServiceLoading) => {
      this.isLoading = isLoaderServiceLoading;
    });
  }

  async createCampaign() {
    if (this.title.invalid || this.description.invalid || this.imageUrl.invalid || this.target.invalid || this.deadline.invalid) {
      this.toastr.error('Please fill out all required fields correctly.');
      return;
    }

    try {
      this.loaderService.show();
      await this.thirdwebService.createCampaign({
        title: this.title.value as string,
        description: this.description.value as string,
        imageUrl: this.imageUrl.value as string,
        target: this.target.value as number,
        deadline: this.deadline.value as string,
      });

      this.toastr.success('Campaign successfully created!');
      this.loaderService.hide();
      this.router.navigate(['/']);
    } catch (err: any) {
      const errorMessage = err?._reason ? 
        this.upperCaseFirstLetterPipe.transform(err?._reason) :
        'Something went wrong!'

      this.toastr.error(errorMessage);
      this.loaderService.hide();
    }
  }

  get submitDisabled(): boolean {
    return !this.title || !this.description || !this.imageUrl || !this.target || !this.deadline;
  }
}
